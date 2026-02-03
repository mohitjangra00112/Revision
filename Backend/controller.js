
//   Controller Pattern


// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock database
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: 2, name: 'Admin User', email: 'admin@example.com', role: 'admin' }
];
let nextId = 3;

const userController = {
    // GET /users
    getAllUsers: (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search;
            
            let filteredUsers = users;
            
            // Search functionality
            if (search) {
                filteredUsers = users.filter(user => 
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
                );
            }
            
            // Pagination
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
            
            res.json({
                users: paginatedUsers.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                })),
                pagination: {
                    page,
                    limit,
                    total: filteredUsers.length,
                    pages: Math.ceil(filteredUsers.length / limit)
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    // GET /users/:id
    getUserById: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const user = users.find(u => u.id === id);
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    // GET /users/profile
    getProfile: (req, res) => {
        try {
            const user = req.user; // From auth middleware
            res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    // POST /users/register
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            
            // Check if user exists
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                return res.status(409).json({ error: 'Email already exists' });
            }
            
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Create user
            const newUser = {
                id: nextId++,
                name,
                email,
                password: hashedPassword,
                role: 'user',
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            
            // Generate token
            const token = jwt.sign(
                { id: newUser.id, email: newUser.email },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '7d' }
            );
            
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                },
                token
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    // POST /users/login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Find user
            const user = users.find(u => u.email === email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            // Generate token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '7d' }
            );
            
            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    // PUT /users/:id
    updateUser: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const userIndex = users.findIndex(u => u.id === id);
            
            if (userIndex === -1) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            const { name, email } = req.body;
            
            // Check if email exists for another user
            const emailExists = users.find(u => u.email === email && u.id !== id);
            if (emailExists) {
                return res.status(409).json({ error: 'Email already exists' });
            }
            
            users[userIndex] = {
                ...users[userIndex],
                name,
                email,
                updatedAt: new Date().toISOString()
            };
            
            res.json({
                message: 'User updated successfully',
                user: {
                    id: users[userIndex].id,
                    name: users[userIndex].name,
                    email: users[userIndex].email,
                    role: users[userIndex].role
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    // DELETE /users/:id
    deleteUser: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const userIndex = users.findIndex(u => u.id === id);
            
            if (userIndex === -1) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            const deletedUser = users.splice(userIndex, 1)[0];
            
            res.json({
                message: 'User deleted successfully',
                user: {
                    id: deletedUser.id,
                    name: deletedUser.name,
                    email: deletedUser.email
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    // GET /users/admin/stats
    getUserStats: (req, res) => {
        try {
            const stats = {
                totalUsers: users.length,
                adminUsers: users.filter(u => u.role === 'admin').length,
                regularUsers: users.filter(u => u.role === 'user').length,
                recentUsers: users.filter(u => {
                    if (!u.createdAt) return false;
                    const userDate = new Date(u.createdAt);
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    return userDate > weekAgo;
                }).length
            };
            
            res.json({ stats });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = userController;