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

// ডাটাবেস টেবিল তৈরি (পুরানোটি মুছে নতুন টেবিল তৈরি হবে)
client.query(`DROP TABLE IF EXISTS employees;
    CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        nid VARCHAR(50),
        name VARCHAR(100),
        country VARCHAR(50),
        mobile VARCHAR(20),
        passport VARCHAR(50),
        profession VARCHAR(50),
        image_url TEXT
    );
`).then(() => console.log("টেবিল তৈরি হয়েছে!"))
  .catch(err => console.error("টেবিল তৈরিতে সমস্যা:", err));

// ডাটা সেভ করার রাউট
app.post('/add-record', async (req, res) => {
    try {
        const { nid, name, country, mobile, passport, profession, image_url } = req.body;
        const query = `INSERT INTO employees(nid, name, country, mobile, passport, profession, image_url) 
                       VALUES($1, $2, $3, $4, $5, $6, $7)`;
        await client.query(query, [nid, name, country, mobile, passport, profession, image_url]);
        res.send("সফলভাবে সেভ হয়েছে!");
    } catch (err) {
        console.error(err);
        res.status(500).send("সেভ করতে সমস্যা হয়েছে");
    }
});

// সার্চ করার রাউট
app.get('/search', async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM employees WHERE nid = $1", [req.query.nid]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(process.env.PORT || 3000);
