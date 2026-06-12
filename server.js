const express = require('express');
const { Client } = require('pg');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// ডাটাবেস কানেকশন সেটআপ
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// কানেক্ট করুন এবং ভুল হলে এরর ধরুন
client.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Connection error', err.stack));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ... বাকি পোস্ট রিকোয়েস্ট কোড
app.listen(process.env.PORT || 3000);
