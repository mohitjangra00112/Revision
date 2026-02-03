/// setting response headers



const express = require('express');
const app = express();

app.get('/response-headers', (req, res) => {
    // Set individual headers
    res.set('X-API-Version', '1.0.0');
    res.set('X-Response-Time', '100ms');
    
    // Set multiple headers at once
    res.set({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    
    // Alternative method
    res.header('X-Custom-Header', 'custom-value');
    
    // Set content type
    res.type('application/json');
    // or res.set('Content-Type', 'application/json');
    
    res.json({ 
        message: 'Headers set successfully',
        timestamp: new Date().toISOString()
    });
});

// Headers with specific content types
app.get('/xml', (req, res) => {
    res.set('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0"?>
        <response>
            <message>XML Response</message>
        </response>`);
});

app.get('/csv', (req, res) => {
    res.set({
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="data.csv"'
    });
    res.send('Name,Age,Email\nJohn,30,john@example.com\nJane,25,jane@example.com');
});

app.listen(3000);