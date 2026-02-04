import pool from "../../../db/config.js";
import { generateCustomId } from "../../utils/idGenerator.js";


export const createDoctorService = async (data, creator) => {

    const Createdby = creator ? creator.id : null;
    const Updatedby = creator ? creator.id : null;
    const createdbyname = creator ? creator.username : null;
    const updatedbyname = creator ? creator.username : null;

    const custom_id = generateCustomId("DOC");

    const query = `
    INSERT INTO doctors (name, email, password, phone, description, fee, experience, speciality, is_active, profile_image, created_by, updated_by, created_by_name, updated_by_name, custom_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *`;
    try {
        const result = await pool.query(query, [data.name, data.email, data.password, data.phone, data.description, data.fee, data.experience, data.speciality, data.is_active, data.profile_image, Createdby, Updatedby, createdbyname, updatedbyname, custom_id]);
        console.log("✅ Doctor created successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error creating doctor:", error);
        throw error;
    }
};

export const getDoctorsService = async () => {
    const query = `SELECT * FROM doctors`;
    try {
        const result = await pool.query(query);
        console.log("✅ Doctors retrieved successfully");
        return result.rows;
    } catch (error) {
        console.error("❌ Error retrieving doctors:", error);
        throw error;
    }
};

export const getDoctorByIdService = async (id) => {
    const query = `SELECT * FROM doctors WHERE id = $1`;
    try {
        const result = await pool.query(query, [id]);
        console.log("✅ Doctor retrieved successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error retrieving doctor:", error);
        throw error;
    }
};

export const updateDoctorService = async (id, data) => {
    const query = `
    UPDATE doctors
    SET name = $2, email = $3, password = $4, phone = $5, description = $6, fee = $7, experience = $8, speciality = $9, is_active = $10, approved = $11,updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [id, data.name, data.email, data.password, data.phone, data.description, data.fee, data.experience, data.speciality, data.is_active, data.approved]);
        console.log("✅ Doctor updated successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error updating doctor:", error);
        throw error;
    }
};

export const deleteDoctorService = async (id) => {
    const query = `DELETE FROM doctors WHERE id = $1 RETURNING *;`;
    try {
        const result = await pool.query(query, [id]);
        console.log("✅ Doctor deleted successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error deleting doctor:", error);
        throw error;
    }
};


export const TakeDoctorAppoitmentService = async (doctorId, patientId, specil_detail, appoitment_date) => {
    const query = `
    INSERT INTO doctor_patient (doctor_id, patient_id, specil_detail, appoitment_date   )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [doctorId, patientId, specil_detail, appoitment_date]);
        console.log("✅ Doctor assigned to patient successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error assigning doctor to patient:", error);
        throw error;
    }
};

export const updateDoctorAppoitmentService = async (doctorId, patientId, specil_detail, appoitment_date) => {
    const query = `
    UPDATE doctor_patient
    SET specil_detail = $3, appoitment_date = $4
    WHERE doctor_id = $1 AND patient_id = $2
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [doctorId, patientId, specil_detail, appoitment_date]);
        console.log("✅ Doctor appoitment updated successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error updating doctor appoitment:", error);
        throw error;
    }
};


export const DeleteAppoitmentService = async (doctorId, patientId) => {
    const query = `DELETE FROM doctor_patient WHERE doctor_id = $1 AND patient_id = $2 RETURNING *;`;
    try {
        const result = await pool.query(query, [doctorId, patientId]);
        console.log("✅ Doctor appoitment Cancelled successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error cancelling doctor appoitment:", error);
        throw error;
    }
};