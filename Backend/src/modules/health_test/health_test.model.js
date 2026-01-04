import pool from "../../../db/config.js";

export const createHealthTestTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS health_tests (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        await pool.query(query);
        console.log("✅ Health Tests table created");
    } catch (error) {
        console.error("❌ Error creating health tests table:", error);
    }
};

export const UserHealthTestTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS user_health_tests (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      health_test_id INT REFERENCES health_tests(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        await pool.query(query);
        console.log("✅ User Health Tests table created");
    } catch (error) {
        console.error("❌ Error creating user health tests table:", error);
    }
};
