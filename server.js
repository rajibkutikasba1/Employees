const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
client.connect();

// টেবিল ঠিক করার কোড
client.query(`CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    nid VARCHAR(50),
    name VARCHAR(100),
    image_url TEXT
);`);

app.post('/add-record', async (req, res) => {
    await client.query("INSERT INTO employees(nid, name, image_url) VALUES($1, $2, $3)", 
    [req.body.nid, req.body.name, req.body.image_url]);
    res.send("OK");
});

app.get('/search', async (req, res) => {
    const result = await client.query("SELECT * FROM employees WHERE nid = $1", [req.query.nid]);
    res.json(result.rows[0]);
});

app.listen(process.env.PORT || 3000);
