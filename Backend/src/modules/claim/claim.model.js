import pool from "../../../db/config.js";

export const createClaimTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS claims (
      id VARCHAR(50) PRIMARY KEY,
      user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
      insurance_id VARCHAR(50) REFERENCES insurance(id) ON DELETE CASCADE,
      claim_amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      reason TEXT,
      approved_amount DECIMAL(10, 2) DEFAULT 0,
      rejected_amount DECIMAL(10, 2) DEFAULT 0,
      approved_by VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
      rejected_by VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
      approved_at TIMESTAMP,
      rejected_at TIMESTAMP,
      documents_upload TEXT,
      created_by VARCHAR(50),
      updated_by VARCHAR(50),
      created_by_name VARCHAR(50),
      updated_by_name VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    // Columns ensure
    await pool.query(`ALTER TABLE claims ADD COLUMN IF NOT EXISTS created_by VARCHAR(50)`);
    await pool.query(`ALTER TABLE claims ADD COLUMN IF NOT EXISTS updated_by VARCHAR(50)`);
    await pool.query(`ALTER TABLE claims ADD COLUMN IF NOT EXISTS created_by_name VARCHAR(50)`);
    await pool.query(`ALTER TABLE claims ADD COLUMN IF NOT EXISTS updated_by_name VARCHAR(50)`);
    console.log("✅ Claims table created");
  } catch (error) {
    console.error("❌ Error creating claims table:", error);
  }
};