const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; // variable PORT given by heroku

// Serve app from the public folder:
app.use(express.static(publicPath));

// Serve 'index.html' for all requests
// that are not found in the public folder
// (like '/create, there is no 'create folder in public)
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up!');
});
