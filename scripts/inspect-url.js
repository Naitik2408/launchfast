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

function apiCall(token, path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      method: method,
    };
    if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }
    const req = https.request('https://www.googleapis.com' + path, options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data: data });
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function run() {
  const token = await getAccessToken([
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly'
  ]);

  console.log('Inspecting URL under sc-domain:naitik.work ...');
  const inspectRes = await apiCall(token, '/v1/urlInspection/index:inspect', 'POST', JSON.stringify({
    inspectionUrl: 'https://launchfast.naitik.work/',
    siteUrl: 'sc-domain:naitik.work'
  }));

  console.log('Inspect Result Status:', inspectRes.status);
  console.log('Inspect Result Data:\n', JSON.stringify(JSON.parse(inspectRes.data), null, 2));

  // Submit sitemap
  console.log('Submitting sitemap https://launchfast.naitik.work/sitemap.xml ...');
  const sitemapRes = await apiCall(
    token, 
    '/webmasters/v3/sites/' + encodeURIComponent('sc-domain:naitik.work') + '/sitemaps/' + encodeURIComponent('https://launchfast.naitik.work/sitemap.xml'),
    'PUT'
  );
  console.log('Sitemap Submission Status:', sitemapRes.status, sitemapRes.data);
}

run().catch(console.error);
