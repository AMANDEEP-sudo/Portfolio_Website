const http = require('http');

async function testAPIs() {
  const endpoints = [
    '/api/github/stats',
    '/api/github/calendar',
    '/api/leetcode/stats',
    '/api/leetcode/calendar'
  ];

  for (const endpoint of endpoints) {
    console.log(`\n\n=== Testing ${endpoint} ===\n`);
    
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`);
      const data = await response.json();
      
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}

// Wait a bit for server to start, then test
setTimeout(testAPIs, 3000);
