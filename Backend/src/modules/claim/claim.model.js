import pool from "../../../db/config.js";

export const createClaimTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS claims (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      insurance_id INT REFERENCES insurance(id) ON DELETE CASCADE,
      claim_amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      reason TEXT,
      approved_amount DECIMAL(10, 2) DEFAULT 0,
      rejected_amount DECIMAL(10, 2) DEFAULT 0,
      approved_by INT REFERENCES users(id) ON DELETE CASCADE,
      rejected_by INT REFERENCES users(id) ON DELETE CASCADE,
      approved_at TIMESTAMP,
      rejected_at TIMESTAMP,
      documents_upload TEXT,
      created_by INT,
      updated_by INT,
      created_by_name VARCHAR(50),
      updated_by_name VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    await pool.query(`ALTER TABLE claims ADD COLUMN IF NOT EXISTS created_by INT`);
    await pool.query(`ALTER TABLE claims ADD COLUMN IF NOT EXISTS updated_by INT`);
    await pool.query(`ALTER TABLE claims ADD COLUMN IF NOT EXISTS created_by_name VARCHAR(50)`);
    await pool.query(`ALTER TABLE claims ADD COLUMN IF NOT EXISTS updated_by_name VARCHAR(50)`);
    console.log("✅ Claims table created");
  } catch (error) {
    console.error("❌ Error creating claims table:", error);
  }
};