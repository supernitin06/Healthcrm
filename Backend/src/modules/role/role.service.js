import pool from "../../../db/config.js";

export const createRoleService = async (name) => {
    const result = await pool.query(
        "INSERT INTO roles (name) VALUES ($1) RETURNING *",
        [name]
    );
    return result.rows[0];
};

export const getRolesService = async () => {
    const result = await pool.query("SELECT * FROM roles");
    return result.rows;
};

export const getRoleByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    return result.rows[0];
};

export const updateRoleService = async (id, name) => {
    const result = await pool.query(
        "UPDATE roles SET name = $2 WHERE id = $1 RETURNING *",
        [id, name]
    );
    return result.rows[0];
};

export const deleteRoleService = async (id) => {
    const result = await pool.query("DELETE FROM roles WHERE id = $1 RETURNING *", [
        id,
    ]);
    return result.rows[0];
};
