import pool from "../../../db/config.js";
import { generateCustomId } from "../../utils/idGenerator.js";
import { getUserById } from "../authuser/authuser.service.js";

export const createInsurance = async (insurance) => {
    const custom_id = generateCustomId("INS");
    const query = `
    INSERT INTO insurance (name, description, price, custom_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [insurance.name, insurance.description, insurance.price, custom_id]);
        console.log("✅ Insurance created successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error creating insurance:", error);
        throw error;
    }
};


export const getInsurance = async () => {
    const query = `
    SELECT * FROM insurance;
  `;
    try {
        const result = await pool.query(query);
        console.log("✅ Insurance fetched successfully");
        return result.rows;
    } catch (error) {
        console.error("❌ Error fetching insurance:", error);
        throw error;
    }
};

export const getInsuranceById = async (id) => {
    const query = `
    SELECT * FROM insurance
    WHERE id = $1;
  `;
    try {
        const result = await pool.query(query, [id]);
        console.log("✅ Insurance fetched successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error fetching insurance:", error);
        throw error;
    }
};



export const updateInsurance = async (insurance) => {
    const query = `
    UPDATE insurance
    SET name = $1, description = $2, price = $3
    WHERE id = $4
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [insurance.name, insurance.description, insurance.price, insurance.id]);
        console.log("✅ Insurance updated successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error updating insurance:", error);
        throw error;
    }
};


export const deleteInsurance = async (id) => {
    const query = `
    DELETE FROM insurance
    WHERE id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [id]);
        console.log("✅ Insurance deleted successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error deleting insurance:", error);
        throw error;
    }
};


export const assignInsuranceToUser = async (insuranceId, userId) => {

    const insurance = await getInsuranceById(insuranceId);
    const user = await getUserById(userId);

    const query = `
    INSERT INTO user_insurance (
        user_id, insurance_id, premium_amount, claim_amount, 
        hospital_coverage, specialist_coverage, activation_charge, 
        start_date, end_date
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 year')
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [userId, insuranceId, insurance.activation_charge, insurance.claim_amount, insurance.hospital_coverage, insurance.specialist_coverage, insurance.activation_charge]);
        console.log("✅ Insurance assigned successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error assigning insurance:", error);
        throw error;
    }
};

export const getAssignInsuranceToUser = async (id) => {
    const query = `
    SELECT
        ui.user_insurance_id,
        ui.status,
        ui.start_date,
        ui.end_date,
        json_build_object(
            'id', u.id,
            'name', u.name,
            'email', u.email
        ) AS user,
        json_build_object(
            'id', i.id,
            'name', i.name,
            'description', i.description,
            'activation_charge', i.activation_charge,
            'rating', i.rating
        ) AS insurance
    FROM user_insurance ui
    JOIN users u ON u.id = ui.user_id
    JOIN insurance i ON i.id = ui.insurance_id
    WHERE ui.user_insurance_id = $1;
  `;
    try {
        const result = await pool.query(query, [id]);
        console.log("✅ User Insurance fetched successfully with details");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error fetching user insurance details:", error);
        throw error;
    }
};


export const deleteAssignInsuranceToUser = async (id) => {
    const query = `
    DELETE FROM user_insurance
    WHERE id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [id]);
        console.log("✅ Insurance deleted successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error deleting insurance:", error);
        throw error;
    }
};
