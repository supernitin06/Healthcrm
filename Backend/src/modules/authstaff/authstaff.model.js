import pool from "../../../db/config.js";

export const createStaffTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS staff (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL, 
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      
      role_id INT REFERENCES roles(id) ON DELETE SET NULL,
      role_name VARCHAR(50),

      reset_token VARCHAR(255),
      reset_token_expiry TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '15 minutes'),

      is_active BOOLEAN DEFAULT true,
      last_login TIMESTAMP,
 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        await pool.query(query);
        // Ensure role_name column exists (in case table was created before this column was added)
        await pool.query(`ALTER TABLE staff ADD COLUMN IF NOT EXISTS role_name VARCHAR(50)`);
        console.log("✅ Users table created (staff)");
    } catch (error) {
        console.error("❌ Error creating users table:", error);
    }
};
