const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.static(__dirname));

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
client.connect();

app.post('/add-record', async (req, res) => {
    const { nid, name, country, mobile, passport, profession, image } = req.body;
    await client.query("INSERT INTO employees(nid, name, country, mobile, passport, profession, image_url) VALUES($1, $2, $3, $4, $5, $6, $7)", 
    [nid, name, country, mobile, passport, profession, image]);
    res.send("OK");
});

app.get('/search', async (req, res) => {
    const result = await client.query("SELECT * FROM employees WHERE nid = $1", [req.query.nid]);
    res.json(result.rows[0]);
});

app.listen(process.env.PORT || 3000);
