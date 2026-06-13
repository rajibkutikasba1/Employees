// সব ইউজার দেখার জন্য নতুন একটি লিঙ্ক (Admin only)
app.get('/all-users', async (req, res) => {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
});
