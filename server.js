// টেবিল তৈরি করার সময় পুরনোটি মুছে নতুন করে তৈরি করবে
await client.query(`
    DROP TABLE IF EXISTS patients; 
    CREATE TABLE patients (
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
