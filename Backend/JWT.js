const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';

// Mock users database
const users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: '$2b$10$hash...',
        role: 'admin',
        refreshTokens: []
    }
];

// JWT utilities
const jwtUtils = {
    generateTokens: (user) => {
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        };
        
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
        
        return { accessToken, refreshToken };
    },
    
    verifyToken: (token, secret = JWT_SECRET) => {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }
};

// JWT Authentication middleware
const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    req.user = decoded;
    next();
};

// Role-based authorization
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        
        next();
    };
};

// Login endpoint
app.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = users.find(u => u.username === username);
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const { accessToken, refreshToken } = jwtUtils.generateTokens(user);
        
        // Store refresh token
        user.refreshTokens.push(refreshToken);
        
        res.json({
            message: 'Login successful',
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Refresh token endpoint
app.post('/auth/refresh', (req, res) => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token required' });
    }
    
    const decoded = jwtUtils.verifyToken(refreshToken, JWT_REFRESH_SECRET);
    if (!decoded) {
        return res.status(401).json({ error: 'Invalid refresh token' });
    }
    
    const user = users.find(u => u.id === decoded.id);
    if (!user || !user.refreshTokens.includes(refreshToken)) {
        return res.status(401).json({ error: 'Invalid refresh token' });
    }
    
    const { accessToken, refreshToken: newRefreshToken } = jwtUtils.generateTokens(user);
    
    // Replace old refresh token
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    user.refreshTokens.push(newRefreshToken);
    
    res.json({ accessToken, refreshToken: newRefreshToken });
});

// Logout endpoint
app.post('/auth/logout', jwtAuth, (req, res) => {
    const { refreshToken } = req.body;
    
    const user = users.find(u => u.id === req.user.id);
    if (user && refreshToken) {
        user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    }
    
    res.json({ message: 'Logout successful' });
});

// Protected routes
app.get('/profile', jwtAuth, (req, res) => {
    res.json({
        message: 'Profile data',
        user: req.user
    });
});

app.get('/admin', jwtAuth, requireRole(['admin']), (req, res) => {
    res.json({ message: 'Admin area' });
});

app.listen(3000);