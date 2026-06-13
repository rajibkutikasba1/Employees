const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
client.connect();

app.post('/add-record', async (req, res) => {
    await client.query("INSERT INTO patients(nid, name) VALUES($1, $2)", [req.body.nid, req.body.name]);
    res.send("OK");
});

// সার্চ করার জন্য নতুন লাইন
app.get('/search', async (req, res) => {
    const result = await client.query("SELECT * FROM patients WHERE nid = $1", [req.query.nid]);
    res.json(result.rows[0]);
});

app.listen(process.env.PORT || 3000);
