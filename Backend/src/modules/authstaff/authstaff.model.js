import pool from "../../../db/config.js";

export const createStaffTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS staff (
      id VARCHAR(50) PRIMARY KEY,
      username VARCHAR(50) NOT NULL, 
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      team_id VARCHAR(50) REFERENCES teams(id) ON DELETE SET NULL,
      role_id VARCHAR(50) REFERENCES roles(id) ON DELETE SET NULL,
      role_name VARCHAR(50),
      team_name VARCHAR(50),
      created_by_name VARCHAR(50),
      updated_by_name VARCHAR(50),
      special_position VARCHAR(50),
      reset_token VARCHAR(255),
      reset_token_expiry TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '15 minutes'),
      profile_image VARCHAR(255),
      is_active BOOLEAN DEFAULT true,
      last_login TIMESTAMP, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by VARCHAR(50),
      updated_by VARCHAR(50)
    );
  `;
  try {
    await pool.query(query);
    // Ensure columns exist
    await pool.query(`ALTER TABLE staff ADD COLUMN IF NOT EXISTS role_name VARCHAR(50)`);
    await pool.query(`ALTER TABLE staff ADD COLUMN IF NOT EXISTS created_by VARCHAR(50)`);
    await pool.query(`ALTER TABLE staff ADD COLUMN IF NOT EXISTS updated_by VARCHAR(50)`);
    await pool.query(`ALTER TABLE staff ADD COLUMN IF NOT EXISTS created_by_name VARCHAR(50)`);
    await pool.query(`ALTER TABLE staff ADD COLUMN IF NOT EXISTS updated_by_name VARCHAR(50)`);

    // Note: If altering existing INT columns to VARCHAR, explicitly might be needed. 
    // But assuming fresh setup or manual migration for major type change.

    console.log("✅ Users table created (staff)");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  }
};
