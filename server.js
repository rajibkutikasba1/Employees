// অটোমেটিক টেবিল তৈরি করার কোড
client.query(`
    CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        nid VARCHAR(50),
        name VARCHAR(100),
        mobile VARCHAR(20)
    )
`).then(() => console.log("Table ready!")).catch(err => console.log(err));
