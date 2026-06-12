const express = require('express');
const { Client } = require('pg');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/add-patient', async (req, res) => {
    const { nid, name, mobile } = req.body;
    try {
        await client.query('INSERT INTO patients(nid, name, mobile) VALUES($1, $2, $3)', [nid, name, mobile]);
        res.send("Success");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(process.env.PORT || 3000);
