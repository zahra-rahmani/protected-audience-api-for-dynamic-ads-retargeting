const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Load SSL certificate and key
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Middleware to set the Supports-Loading-Mode header for all responses
app.use((req, res, next) => {
    res.setHeader('Supports-Loading-Mode', 'fenced-frame'); // Add the required header
    next();
});

// Serve bid.js specifically to ensure Ad-Auction-Allowed header is set
app.get('/bid.js', (req, res) => {
    res.set('Ad-Auction-Allowed', 'true'); // Add the custom header
    res.sendFile(path.join(__dirname, 'public', 'bid.js'), (err) => {
        if (err) {
            console.error('Error serving bid.js:', err);
            res.status(err.status || 500).end();
        }
    });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to add user to interest group
app.post('/api/protected-audience', express.json(), (req, res) => {
    const { interestGroup } = req.body;
    console.log(`User added to interest group: ${interestGroup}`);
    res.status(200).json({ message: `User added to ${interestGroup} group` });
});

// Create HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});
