import pool from "../../../db/config.js";

export const DoctorTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS doctors (
      id SERIAL PRIMARY KEY,
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
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    pool.query(query, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Doctors table created successfully");
        }
    });
};


export const DoctorPatientTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS doctor_patient (
      id SERIAL PRIMARY KEY,
      doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE,
      patient_id INT REFERENCES users(id) ON DELETE CASCADE,
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