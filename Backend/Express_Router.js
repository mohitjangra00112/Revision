// routes/users.js
const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
    console.log('Users router middleware');
    console.log('Time:', Date.now());
    next();
});

// Routes
router.get('/', (req, res) => {
    res.json({ message: 'Users homepage' });
});

router.get('/:id', (req, res) => {
    res.json({ userId: req.params.id });
});

router.post('/', (req, res) => {
    res.json({ message: 'User created', data: req.body });
});

module.exports = router;



///// Using Router in Main App


// app.js
const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());

// Mount the router
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});



// User Routes with Controller


// routes/users.js
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validation.validateUser, userController.register);
router.post('/login', validation.validateLogin, userController.login);

// Protected routes (require authentication)
router.use(auth.authenticate); // Apply to all routes below

router.get('/', userController.getAllUsers);
router.get('/profile', userController.getProfile);
router.get('/:id', validation.validateUserId, userController.getUserById);
router.put('/:id', validation.validateUserId, validation.validateUserUpdate, userController.updateUser);
router.delete('/:id', validation.validateUserId, userController.deleteUser);

// Admin only routes
router.get('/admin/stats', auth.requireAdmin, userController.getUserStats);

module.exports = router;



////   Router with error handling 


const express = require('express');
const router = express.Router();

// Async wrapper for error handling
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes with async error handling
router.get('/users', asyncHandler(async (req, res) => {
    // Simulate async operation
    const users = await getUsersFromDatabase();
    res.json({ users });
}));

router.post('/users', asyncHandler(async (req, res) => {
    const user = await createUser(req.body);
    res.status(201).json({ user });
}));

// Error handling middleware for this router
router.use((err, req, res, next) => {
    console.error('Router error:', err);
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    
    if (err.name === 'NotFoundError') {
        return res.status(404).json({ error: err.message });
    }
    
    // Pass to global error handler
    next(err);
});

module.exports = router;



