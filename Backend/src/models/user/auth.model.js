import pool from "../../../db/config.js";

export const authtable = async () => {
  const query = `
   CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY, 
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;

  try {
    const res = await pool.query(query);
    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

