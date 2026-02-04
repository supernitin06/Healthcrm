import pool from "../../../db/config.js";

export const createInsuranceTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS insurance (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      description TEXT,
      activation_charge DECIMAL(10, 2) NOT NULL,
      rating DECIMAL(10, 2) NOT NULL DEFAULT 0,
      about_insurance TEXT,
      image_url TEXT,
      hospital_coverage TEXT,
      specialist_coverage TEXT,
      claim_amount DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      custom_id VARCHAR(50) UNIQUE
    );
  `;
  try {
    await pool.query(query);
    await pool.query(`ALTER TABLE insurance ADD COLUMN IF NOT EXISTS custom_id VARCHAR(50) UNIQUE`);
    console.log("✅ Insurance table created");
  } catch (error) {
    console.error("❌ Error creating insurance table:", error);
  }
};



export const UserInsuranceTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_insurance (
      user_insurance_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      insurance_id INT REFERENCES insurance(id) ON DELETE CASCADE,
      status VARCHAR(20) DEFAULT 'active',
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      premium_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
      claim_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
      hospital_coverage TEXT,
      specialist_coverage TEXT,
      activation_charge DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
  try {
    await pool.query(query);
    console.log("✅ User insurance table created");
  } catch (error) {
    console.error("❌ Error creating user insurance table:", error);
  }
};