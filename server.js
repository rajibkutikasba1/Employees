const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.static(__dirname));

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
client.connect();

// টেবিল তৈরি
client.query(`CREATE TABLE IF NOT EXISTS users (
    nid VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100),
    name VARCHAR(100),
    country VARCHAR(100),
    mobile VARCHAR(50),
    passport VARCHAR(100),
    profession VARCHAR(100),
    image_url TEXT
)`);

app.post('/register', async (req, res) => {
    try {
        const { nid, password } = req.body;
        await client.query("INSERT INTO users (nid, password) VALUES ($1, $2)", [nid, password]);
        res.send("OK");
    } catch (e) { res.status(500).send(e.message); }
});

app.post('/login', async (req, res) => {
    const { nid, password } = req.body;
    const result = await client.query("SELECT * FROM users WHERE nid = $1 AND password = $2", [nid, password]);
    res.json(result.rows[0] || null);
});

app.get('/all-users', async (req, res) => {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
});

app.listen(process.env.PORT || 3000);
