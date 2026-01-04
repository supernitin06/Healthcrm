import pool from "../../../db/config.js";

// --- Health Package CRUD ---

export const createHealthPackage = async (data) => {
    const query = `
    INSERT INTO health_packages (name, description, price)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [data.name, data.description, data.price]);
        console.log("✅ Health Package created successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error creating health package:", error);
        throw error;
    }
};

export const getHealthPackages = async () => {
    // Determine the structure of the returned object properly
    // We want to return the package info AND the list of tests it contains
    const query = `
    SELECT 
      hp.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', ht.id, 
            'name', ht.name, 
            'description', ht.description, 
            'price', ht.price
          )
        ) FILTER (WHERE ht.id IS NOT NULL), 
        '[]'
      ) as tests
    FROM health_packages hp
    LEFT JOIN health_package_tests hpt ON hp.id = hpt.package_id
    LEFT JOIN health_tests ht ON hpt.health_test_id = ht.id
    GROUP BY hp.id;
  `;
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("❌ Error retrieving health packages:", error);
        throw error;
    }
};
export const getHealthPackageById = async (id) => {
    const query = `
    SELECT 
      hp.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', ht.id, 
            'name', ht.name, 
            'description', ht.description, 
            'price', ht.price
          )
        ) FILTER (WHERE ht.id IS NOT NULL), 
        '[]'
      ) as tests
    FROM health_packages hp
    LEFT JOIN health_package_tests hpt ON hp.id = hpt.package_id
    LEFT JOIN health_tests ht ON hpt.health_test_id = ht.id
    WHERE hp.id = $1
    GROUP BY hp.id;
  `;
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error retrieving health package:", error);
        throw error;
    }
}

export const updateHealthPackage = async (id, data) => {
    const query = `
    UPDATE health_packages
    SET name = $2, description = $3, price = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [id, data.name, data.description, data.price]);
        if (result.rows.length === 0) throw new Error("Health Package not found");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error updating health package:", error);
        throw error;
    }
};

export const deleteHealthPackage = async (id) => {
    const query = `DELETE FROM health_packages WHERE id = $1 RETURNING *;`;
    try {
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) throw new Error("Health Package not found");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error deleting health package:", error);
        throw error;
    }
};

// --- Package Content Management (Adding/Removing Tests) ---

export const addTestToPackage = async (packageId, healthTestId) => {
    const query = `
    INSERT INTO health_package_tests (package_id, health_test_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [packageId, healthTestId]);
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error adding test to package:", error);
        throw error;
    }
};

export const removeTestFromPackage = async (packageId, healthTestId) => {
    const query = `
    DELETE FROM health_package_tests 
    WHERE package_id = $1 AND health_test_id = $2
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [packageId, healthTestId]);
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error removing test from package:", error);
        throw error;
    }
};

// --- User Assignment ---

export const assignPackageToUser = async (packageId, userId) => {
    const query = `
    INSERT INTO user_health_packages (user_id, package_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [userId, packageId]);
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error assigning package to user:", error);
        throw error;
    }
};

export const getUserPackages = async (userId) => {
    const query = `
    SELECT uhp.id, uhp.created_at, hp.name, hp.description, hp.price
    FROM user_health_packages uhp
    JOIN health_packages hp ON uhp.package_id = hp.id
    WHERE uhp.user_id = $1;
  `;
    try {
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.error("❌ Error retrieving user packages:", error);
        throw error;
    }
};

export const deleteUserPackageAssignment = async (assignmentId) => {
    const query = `DELETE FROM user_health_packages WHERE id = $1 RETURNING *;`;
    try {
        const result = await pool.query(query, [assignmentId]);
        if (result.rows.length === 0) throw new Error("Assignment not found");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error deleting user package assignment:", error);
        throw error;
    }
};
