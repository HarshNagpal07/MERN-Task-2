const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting MERN Social Media App...\n');

// Start backend
console.log('Starting backend server...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// Wait a moment then start frontend
setTimeout(() => {
  console.log('\nStarting frontend...');
  const frontend = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (err) => {
    console.error('Frontend error:', err);
  });
}, 3000);

backend.on('error', (err) => {
  console.error('Backend error:', err);
});

console.log('\n✅ Both servers are starting...');
console.log('🔗 Backend: http://localhost:5000');
console.log('🔗 Frontend: http://localhost:3000');
console.log('\nPress Ctrl+C to stop both servers');
