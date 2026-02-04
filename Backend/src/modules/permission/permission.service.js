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
    const role = await pool.query("SELECT * FROM roles WHERE id = $1", [roleId]);
    const permission = await pool.query("SELECT * FROM permissions WHERE id = $1", [permissionId]);
    const result = await pool.query(
        "INSERT INTO role_permissions (role_id, permission_id,role_name,permission_name,permission_assigned_by) VALUES ($1, $2,$3,$4,$5) RETURNING *",
        [roleId, permissionId, role.rows[0].name, permission.rows[0].name, assignerId]
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
    const id = generateCustomId("PER");
    const result = await pool.query(
        "INSERT INTO permissions (id, name, permission_type) VALUES ($1, $2, $3) RETURNING *",
        [id, name, permission_type]
    );

    return result.rows[0];
};
