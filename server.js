const path = require('path');
app.use(express.static(path.join(__dirname, '/'))); // মেইন ফোল্ডার থেকে ফাইল নিবে
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
