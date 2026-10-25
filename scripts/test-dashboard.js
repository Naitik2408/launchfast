const http = require('http');

http.get('http://localhost:3001/dashboard', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Dashboard status code:', res.statusCode);
    const hasError = data.includes('Runtime Error') || data.includes('Your project\'s URL and Key are required');
    console.log('Has Supabase runtime crash:', hasError);
    if (!hasError) {
      console.log('Dashboard rendered successfully without crash!');
    }
  });
});
