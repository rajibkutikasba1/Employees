const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.static(__dirname));

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
client.connect();

// টেবিল তৈরি
client.query(`CREATE TABLE IF NOT EXISTS employees (
    nid VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    country VARCHAR(100),
    mobile VARCHAR(50),
    passport VARCHAR(100),
    profession VARCHAR(100),
    password VARCHAR(100),
    image_url TEXT
)`);

app.post('/register', async (req, res) => {
    try {
        const { nid, name, country, mobile, passport, profession, password, image } = req.body;
        await client.query("INSERT INTO employees VALUES($1, $2, $3, $4, $5, $6, $7, $8)", 
        [nid, name, country, mobile, passport, profession, password, image]);
        res.send("Registered");
    } catch (err) { res.status(500).send(err.message); }
});

app.post('/login', async (req, res) => {
    const { nid, password } = req.body;
    const result = await client.query("SELECT * FROM employees WHERE nid = $1 AND password = $2", [nid, password]);
    res.json(result.rows[0] || null);
});

app.listen(process.env.PORT || 3000);
