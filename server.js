const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// ডাটা সেভ করার জন্য সহজ ফাইল সিস্টেম
app.post('/add-record', (req, res) => {
    const newData = req.body;
    const filePath = path.join(__dirname, 'data.json');

    // পুরনো ডাটা পড়া
    fs.readFile(filePath, 'utf8', (err, data) => {
        let json = [];
        if (!err && data) json = JSON.parse(data);
        
        json.push(newData);

        // নতুন ডাটা ফাইল-এ লেখা
        fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
            if (err) return res.status(500).send("সেভ করতে সমস্যা হয়েছে");
            res.send("সফলভাবে সেভ হয়েছে!");
        });
    });
});

app.listen(process.env.PORT || 3000);
