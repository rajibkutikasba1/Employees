const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log("Database connected successfully!"))
    .catch(err => console.error("Database connection error:", err));

app.post('/add-record', async (req, res) => {
    try {
        const d = req.body;
        // চেক করছি ডাটা আসছে কি না
        console.log("Received data:", d); 
        
        await client.query(
            "INSERT INTO patients(nid, name, father_name, mother_name, village, post_office, thana, district, blood_group, mobile, dob) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
            [d.nid, d.name, d.father_name, d.mother_name, d.village, d.post_office, d.thana, d.district, d.blood_group, d.mobile, d.dob]
        );
        res.status(200).send("ডাটা সেভ হয়েছে!");
    } catch (err) {
        console.error("Query Error:", err); // এটি আপনার রেন্ডার লগে আসল সমস্যা দেখাবে
        res.status(500).send("এরর: " + err.message);
    }
});

app.listen(process.env.PORT || 3000);
