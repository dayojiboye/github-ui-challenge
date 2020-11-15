// Create .env file at the time of build to access environment variables

const fs = require('fs');
fs.writeFileSync('./.env', `API_KEY=${process.env.API_KEY}`);
