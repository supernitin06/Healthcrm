import pool from "../../../db/config.js";

export const authtable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL, 
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role_name VARCHAR(50) NOT NULL, 
      role_id INT REFERENCES roles(id) ON DELETE SET NULL,
      team_id INT REFERENCES teams(id) ON DELETE SET NULL,
      team_name VARCHAR(50) ,
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
    console.log("✅ Users table created with reset password support");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  }
};
