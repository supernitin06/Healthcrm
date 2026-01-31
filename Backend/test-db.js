import pool from "./db/config.js";

const testConnection = async () => {
    console.log("⏳ Testing Database Connection...");
    console.log(`📡 Host: ${process.env.DB_HOST}`);
    console.log(`🗄️  Database: ${process.env.DB_NAME}`);
    console.log(`Utzer: ${process.env.DB_USER}`);

    try {
        const client = await pool.connect();
        console.log("✅ Successfully acquired a client from the pool.");

        const res = await client.query('SELECT NOW() as current_time');
        console.log("✅ Query executed successfully.");
        console.log(`🕒 Database Server Time: ${res.rows[0].current_time}`);

        client.release();
        console.log("✅ Client released.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection Failed:", err.message);
        if (err.message.includes("SSL")) {
            console.error("💡 Hint: Check SSL settings in db/config.js");
        }
        if (err.message.includes("password")) {
            console.error("💡 Hint: Check DB_PASS in .env");
        }
        process.exit(1);
    }
};

testConnection();
 