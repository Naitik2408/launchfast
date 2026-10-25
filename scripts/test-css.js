const http = require('http');

http.get('http://localhost:3001', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    const hasCss = data.includes('stylesheet') || data.includes('<style');
    console.log('Has CSS or style tags:', hasCss);
    const matches = data.match(/<link[^>]+>/g) || [];
    console.log('Link tags:', matches);
  });
});
