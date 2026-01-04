import pool from "../../../db/config.js";

export const createInsurance = async (insurance) => {
    const query = `
    INSERT INTO insurance (name, description, price)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [insurance.name, insurance.description, insurance.price]);
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
    const query = `
    INSERT INTO user_insurance (user_id, insurance_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [userId, insuranceId]);
        console.log("✅ Insurance assigned successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error assigning insurance:", error);
        throw error;
    }
};

export const getAssignInsuranceToUser = async (id) => {
    const query = `
    SELECT * FROM user_insurance
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
