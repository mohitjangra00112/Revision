//// Cookies 

// set cookie ->  res.cookie('key ,'value' , {options});

// get cookies ->   req.cookies;




const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.get('/set-cookies', (req, res) => {
    // Basic cookie
    res.cookie('username', 'john_doe');
    
    // Cookie with options
    res.cookie('session_id', 'abc123', {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        httpOnly: true, // Not accessible via JavaScript
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict' // CSRF protection
    });
    
    // Signed cookie (requires cookie-parser with secret)
    res.cookie('user_id', '12345', { 
        signed: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Cookie with domain and path
    res.cookie('preferences', 'dark-theme', {
        domain: 'localhost',
        path: '/user',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    
    res.json({ message: 'Cookies set successfully' });
});

// Reading cookies (requires cookie-parser middleware)
app.get('/get-cookies', (req, res) => {
    res.json({
        cookies: req.cookies,
        signedCookies: req.signedCookies
    });
});

// Clearing cookies
app.get('/clear-cookies', (req, res) => {
    // Clear specific cookie
    res.clearCookie('username');
    
    // Clear with options (must match original options)
    res.clearCookie('session_id', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    });
    
    res.json({ message: 'Cookies cleared' });
});

app.listen(3000);





const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Basic cookie parser
app.use(cookieParser());

// Cookie parser with secret for signed cookies
app.use(cookieParser('your-secret-key'));

app.listen(3000, () => {
    console.log('Server running with cookie parser');
});



////   Creating and Verifying Signed Cookies

const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const app = express();

// Secret key for signing (use environment variable in production)
const SECRET_KEY = process.env.COOKIE_SECRET || 'your-very-secure-secret-key';
app.use(cookieParser(SECRET_KEY));

// Set signed cookie
app.post('/login', (req, res) => {
    const userId = 12345;
    const userRole = 'admin';
    
    // Set signed cookies
    res.cookie('userId', userId, {
        signed: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'strict'
    });
    
    res.cookie('userRole', userRole, {
        signed: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    
    res.json({ message: 'Login successful, signed cookies set' });
});

// Read signed cookies
app.get('/profile', (req, res) => {
    const userId = req.signedCookies.userId;
    const userRole = req.signedCookies.userRole;
    
    // Check if cookies were tampered with
    if (userId === false || userRole === false) {
        return res.status(401).json({ error: 'Invalid or tampered cookies' });
    }
    
    if (!userId || !userRole) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    res.json({
        message: 'Profile access granted',
        user: {
            id: userId,
            role: userRole
        }
    });
});

app.listen(3000);


