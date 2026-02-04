import pool from "../../../db/config.js";
import { generateCustomId } from "../../utils/idGenerator.js";


// Get all permissions
// Get all permissions
// Get all permissions
// Get all permissions
export const getPermissionsService = async () => {
    const result = await pool.query("SELECT * FROM permissions");
    return result.rows;
};

export const getPermissionByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM permissions WHERE id = $1", [id]);
    return result.rows[0];
};

// Assign permission to role
// Assign permission to role
// Assign permission to role
// Assign permission to role

export const assignPermissionToRoleService = async (roleId, permissionId, assignerId) => {
    const result = await pool.query(
        "INSERT INTO role_permissions (role_id, permission_id,permission_assigned_by) VALUES ($1, $2,$3) RETURNING *",
        [roleId, permissionId, assignerId]
    );
    return result.rows[0];
};

export const removePermissionFromRoleService = async (roleId, permissionId) => {
    const result = await pool.query(
        "DELETE FROM role_permissions WHERE role_id = $1 AND permission_id = $2 RETURNING *",
        [roleId, permissionId]
    );
    return result.rows[0];
};



// Get permissions by role
// Get permissions by role
// Get permissions by role
// Get permissions by role

export const getPermissionsByRoleService = async (roleId) => {
    const result = await pool.query(
        `SELECT p.* FROM permissions p
     JOIN role_permissions rp ON p.id = rp.permission_id
     WHERE rp.role_id = $1`,
        [roleId]
    );
    return result.rows;
};

export const createPermissionService = async (name, permission_type) => {
    const custom_id = generateCustomId("PER");
    const result = await pool.query(
        "INSERT INTO permissions (name, permission_type, custom_id) VALUES ($1, $2, $3) RETURNING *",
        [name, permission_type, custom_id]
    );

    return result.rows[0];
};
