import pool from "../../../db/config.js";

export const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL, 
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      reset_token VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      custom_id VARCHAR(50) UNIQUE
    );
  `;
  try {
    await pool.query(query);
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS custom_id VARCHAR(50) UNIQUE`);
    console.log("✅ Users table created (customers) with employee assignment support");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  }
};
