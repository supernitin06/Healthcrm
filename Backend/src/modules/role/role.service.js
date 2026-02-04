import pool from "../../../db/config.js";
import { generateCustomId } from "../../utils/idGenerator.js";

export const createRoleService = async (name, creator) => {

    const checkRole = await pool.query("SELECT * FROM roles WHERE name = $1", [name]);
    if (checkRole.rows.length > 0) {
        throw new Error("Role already exists");
    }

    const Createdby = creator ? creator.id : null;
    const Updatedby = creator ? creator.id : null;
    const createdbyname = creator ? creator.username : null;
    const updatedbyname = creator ? creator.username : null;

    const id = generateCustomId("ROL");

    try {
        const result = await pool.query(
            "INSERT INTO roles (id, name, created_by, updated_by, created_by_name, updated_by_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [id, name, Createdby, Updatedby, createdbyname, updatedbyname]
        );
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error creating role", error);
        throw error;
    }
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
