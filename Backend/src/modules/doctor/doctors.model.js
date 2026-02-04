import pool from "../../../db/config.js";

export const DoctorTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS doctors (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      description TEXT,
      fee DECIMAL(10, 2) NOT NULL,
      experience INT NOT NULL,
      speciality VARCHAR(255) NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      approved BOOLEAN DEFAULT FALSE,
      created_by VARCHAR(50),
      updated_by VARCHAR(50),
      created_by_name VARCHAR(50),
      updated_by_name VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      profile_image VARCHAR(255)
    );
  `;

  pool.query(query, async (err) => {
    if (err) {
      console.error(err);
    } else {
      // Ensure columns exist or type migration (manual assumption)
      await pool.query(`ALTER TABLE doctors ADD COLUMN IF NOT EXISTS created_by VARCHAR(50)`);
      await pool.query(`ALTER TABLE doctors ADD COLUMN IF NOT EXISTS updated_by VARCHAR(50)`);
      await pool.query(`ALTER TABLE doctors ADD COLUMN IF NOT EXISTS created_by_name VARCHAR(50)`);
      await pool.query(`ALTER TABLE doctors ADD COLUMN IF NOT EXISTS updated_by_name VARCHAR(50)`);
      await pool.query(`ALTER TABLE doctors ADD COLUMN IF NOT EXISTS profile_image VARCHAR(255)`);
      console.log("Doctors table created successfully");
    }
  });
};


export const DoctorPatientTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS doctor_patient (
      id SERIAL PRIMARY KEY,
      doctor_id VARCHAR(50) REFERENCES doctors(id) ON DELETE CASCADE,
      patient_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      specil_detail VARCHAR(255) NOT NULL,
      appoitment_date TIMESTAMP NOT NULL,
      status VARCHAR(255) NOT NULL
    );
  `;
  pool.query(query, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Doctor-Patient table created successfully");
    }
  });
};