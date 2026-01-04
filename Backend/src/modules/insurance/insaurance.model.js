import pool from "../../../db/config.js";

export const createInsuranceTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS insurance (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        await pool.query(query);
        console.log("✅ Insurance table created");
    } catch (error) {
        console.error("❌ Error creating insurance table:", error);
    }
};



export const UserInsuranceTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS user_insurance (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      insurance_id INT REFERENCES insurance(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        await pool.query(query);
        console.log("✅ User insurance table created");
    } catch (error) {
        console.error("❌ Error creating user insurance table:", error);
    }
};