import pool from "../../../db/config.js";
import { generateCustomId } from "../../utils/idGenerator.js";

// --- Health Test CRUD ---

export const createHealthTest = async (data) => {
    const id = generateCustomId("TST");
    const query = `
    INSERT INTO health_tests (id, name, description, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [id, data.name, data.description, data.price]);
        console.log("✅ Health Test created successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error creating health test:", error);
        throw error;
    }
};

export const getHealthTests = async () => {
    const query = `SELECT * FROM health_tests;`;
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("❌ Error retrieving health tests:", error);
        throw error;
    }
};

export const updateHealthTest = async (id, data) => {
    const query = `
    UPDATE health_tests
    SET name = $2, description = $3, price = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [id, data.name, data.description, data.price]);
        if (result.rows.length === 0) throw new Error("Health Test not found");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error updating health test:", error);
        throw error;
    }
};

export const deleteHealthTest = async (id) => {
    const query = `DELETE FROM health_tests WHERE id = $1 RETURNING *;`;
    try {
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) throw new Error("Health Test not found");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error deleting health test:", error);
        throw error;
    }
};

// --- User Assignment ---

export const assignHealthTestToUser = async (healthTestId, userId) => {
    const query = `
    INSERT INTO user_health_tests (user_id, health_test_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [userId, healthTestId]);
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error assigning health test to user:", error);
        throw error;
    }
};

export const getUserHealthTests = async (userId) => {
    const query = `
    SELECT uht.id, uht.created_at, ht.name, ht.description, ht.price
    FROM user_health_tests uht
    JOIN health_tests ht ON uht.health_test_id = ht.id
    WHERE uht.user_id = $1;
  `;
    try {
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.error("❌ Error retrieving user health tests:", error);
        throw error;
    }
};

export const updateUserHealthTestAssignment = async (assignmentId, newHealthTestId) => {
    const query = `
    UPDATE user_health_tests
    SET health_test_id = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [assignmentId, newHealthTestId]);
        if (result.rows.length === 0) throw new Error("Assignment not found");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error updating user health test assignment:", error);
        throw error;
    }
};

export const deleteUserHealthTestAssignment = async (assignmentId) => {
    const query = `DELETE FROM user_health_tests WHERE id = $1 RETURNING *;`;
    try {
        const result = await pool.query(query, [assignmentId]);
        if (result.rows.length === 0) throw new Error("Assignment not found");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error deleting user health test assignment:", error);
        throw error;
    }
};
