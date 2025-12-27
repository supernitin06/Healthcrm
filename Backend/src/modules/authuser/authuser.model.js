import pool from "../../../db/config.js";

export const createUsersTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL, 
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      reset_token VARCHAR(255),
      reset_token_expiry TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '15 minutes'), 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        await pool.query(query);
        console.log("✅ Users table created (customers) with employee assignment support");
    } catch (error) {
        console.error("❌ Error creating users table:", error);
    }
};
