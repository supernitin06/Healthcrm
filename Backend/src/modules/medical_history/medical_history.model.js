import pool from "../../../db/config.js";

export const MedicalHistoryTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS medical_history (
      id VARCHAR(50) PRIMARY KEY,
      user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
      doctor_id VARCHAR(50) REFERENCES doctors(id) ON DELETE SET NULL,
      prescription_file VARCHAR(255),
      category VARCHAR(255),
      title VARCHAR(255),
      details JSONB,
      
      recorded_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Medical History table created successfully");
  } catch (error) {
    console.error("❌ Error creating Medical History table:", error);
  }
};
