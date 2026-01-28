import pool from "../../../db/config.js";

export const createMedicalHistoryService = async (userId, data) => {
    const { category, title, details, recorded_date, doctor_id } = data;
    const query = `
    INSERT INTO medical_history (user_id, category, title, details, recorded_date, doctor_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;
    const result = await pool.query(query, [userId, category, title, details, recorded_date || new Date(), doctor_id]);
    return result.rows[0];
};

export const getMedicalHistoryByUserService = async (userId) => {
    const query = `
        SELECT mh.*, d.name as doctor_name, d.email as doctor_email, d.speciality as doctor_speciality 
        FROM medical_history mh
        LEFT JOIN doctors d ON mh.doctor_id = d.id
        WHERE mh.user_id = $1 
        ORDER BY mh.recorded_date DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
};

export const getMedicalHistoryByIdService = async (id) => {
    const query = `
        SELECT mh.*, d.name as doctor_name, d.email as doctor_email, d.speciality as doctor_speciality
        FROM medical_history mh
        LEFT JOIN doctors d ON mh.doctor_id = d.id
        WHERE mh.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

export const updateMedicalHistoryService = async (id, data) => {
    const { category, title, details, recorded_date } = data;
    const query = `
    UPDATE medical_history
    SET category = $1, title = $2, details = $3, recorded_date = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *;`;
    const result = await pool.query(query, [category, title, details, recorded_date, id]);
    return result.rows[0];
};

export const deleteMedicalHistoryService = async (id) => {
    const query = `DELETE FROM medical_history WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};
