const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// সার্ভার চালু হওয়ার সাথে সাথে টেবিল চেক করবে
async function setupDatabase() {
    try {
        await client.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS patients (
                id SERIAL PRIMARY KEY,
                nid VARCHAR(50),
                name VARCHAR(100),
                father_name VARCHAR(100),
                mother_name VARCHAR(100),
                village VARCHAR(100),
                post_office VARCHAR(100),
                thana VARCHAR(100),
                district VARCHAR(100),
                blood_group VARCHAR(10),
                mobile VARCHAR(20),
                dob DATE,
                image_url TEXT
            );
        `);
        console.log("Table is ready!");
    } catch (err) {
        console.error("Database setup error:", err);
    }
}

setupDatabase();

app.post('/add-record', async (req, res) => {
    try {
        const { nid, name, father_name, mother_name, village, post_office, thana, district, blood_group, mobile, dob } = req.body;
        await client.query(
            "INSERT INTO patients(nid, name, father_name, mother_name, village, post_office, thana, district, blood_group, mobile, dob) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
            [nid, name, father_name, mother_name, village, post_office, thana, district, blood_group, mobile, dob]
        );
        res.send("ডাটা সেভ হয়েছে!");
    } catch (err) {
        res.status(500).send("এরর: " + err.message);
    }
});

app.listen(process.env.PORT || 3000);
