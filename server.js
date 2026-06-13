// আপনার কোডের শুরুর দিকে এই অংশটি বসিয়ে দিন
client.connect()
    .then(async () => {
        console.log("Connected to Database!");
        // টেবিলটি তৈরি করার কোড - এটি রান হবে সার্ভার চালু হওয়ার সাথে সাথে
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
        console.log("Table records is ready!");
    })
    .catch(err => console.error("Database connection error:", err));
