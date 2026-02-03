const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// GET route
app.get('/', (req, res) => {
    res.json({ message: 'GET request to homepage' });   //// always use this for API and React apps . 
    // res.send("hello");
});

// POST route
app.post('/users', (req, res) => {
    const user = req.body;
    res.status(201).json({ 
        message: 'User created',
        user: user 
    });
});

// PUT route
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    res.json({ 
        message: `User ${id} updated`,
        updates: updates 
    });
});

// DELETE route
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    res.json({ message: `User ${id} deleted` });
});

// PATCH route
app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    res.json({ 
        message: `User ${id} partially updated`,
        updates: updates 
    });
});

app.listen(3000);