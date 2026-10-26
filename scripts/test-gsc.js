const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const key = JSON.parse(fs.readFileSync('C:/Users/Naitik/.gemini/antigravity/gsc-service-account.json', 'utf8'));

function getAccessToken(scopes) {
  return new Promise((resolve, reject) => {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claim = {
      iss: key.client_email,
      scope: scopes.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const sHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const sClaim = Buffer.from(JSON.stringify(claim)).toString('base64url');
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(sHeader + '.' + sClaim);
    const signature = signer.sign(key.private_key, 'base64url');
    const jwt = sHeader + '.' + sClaim + '.' + signature;

    const postData = 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + jwt;
    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length,
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) resolve(json.access_token);
          else reject(json);
        } catch (e) {
          reject(data);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  const token = await getAccessToken([
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly'
  ]);
  console.log('Authentication successful!');

  // List existing sites
  const req = https.request('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: 'Bearer ' + token }
  }, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('GSC Sites list:\n', JSON.stringify(JSON.parse(data), null, 2));
    });
  });
  req.end();
}

run().catch(console.error);
