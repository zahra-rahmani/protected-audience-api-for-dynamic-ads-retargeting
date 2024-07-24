const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Load SSL certificate and key
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Serve decision-logic.js with Ad-Auction-Allowed header
app.get('/decision-logic.js', (req, res) => {
    res.set('Ad-Auction-Allowed', 'true');
    res.sendFile(path.join(__dirname, 'public', 'decision-logic.js'), (err) => {
        if (err) {
            console.error('Error serving decision-logic.js:', err);
            res.status(err.status).end();
        }
    });
});

// // Serve decision-logic.js with Ad-Auction-Allowed header
// app.get('https://localhost:3000/bid.js', (req, res) => {
//     res.set('Ad-Auction-Allowed', 'true');
//     next();
// });

// Serve static files
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
