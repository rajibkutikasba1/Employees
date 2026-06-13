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

app.post('/add-record', async (req, res) => {
    try {
        const { nid, name, father_name, mother_name, village, post_office, thana, district, blood_group, mobile, dob } = req.body;
        await client.query(
            `INSERT INTO patients(nid, name, father_name, mother_name, village, post_office, thana, district, blood_group, mobile, dob) 
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [nid, name, father_name, mother_name, village, post_office, thana, district, blood_group, mobile, dob]
        );
        res.status(200).send("সফলভাবে সেভ হয়েছে!");
    } catch (err) {
        console.error(err);
        res.status(500).send("এরর: " + err.message);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
