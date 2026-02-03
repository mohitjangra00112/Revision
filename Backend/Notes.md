
// For response use ->  res.send("hello, world");
// for APi and React use ->     res.json({ message: 'GET request to homepage' });

// URL Parameters    const { userId, postId } = req.params;

// Query  -> // Query parameters: /search?q=node&limit=10&sort=date  
            const query = req.query.q;

//  Middlewares -  buult in 

const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Custom static folder with prefix
app.use('/assets', express.static('assets'));

app.listen(3000);





