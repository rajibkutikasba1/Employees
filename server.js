const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect();

// এটি অটোমেটিক টেবিল তৈরি করবে
client.query(`
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

app.post('/add-record', async (req, res) => {
    // ডাটা ইনসার্ট লজিক...
});

app.listen(process.env.PORT || 3000);
