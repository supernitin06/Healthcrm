
import pool from "../../db/config.js";

export const assignPermissionToRole = async (roleName, permissionName) => {
    const role = await pool.query(`SELECT id, name FROM roles WHERE name = $1`, [roleName]);
    const permission = await pool.query(`SELECT id, name FROM permissions WHERE name = $1`, [permissionName]);
    if (role.rows.length === 0 || permission.rows.length === 0) {
        throw new Error("Role or permission not found");
    }
    await pool.query(`INSERT INTO role_permissions (role_id, permission_id, role_name, permission_name, permission_assigned_by) VALUES ($1, $2, $3, $4, 'SYSTEM') ON CONFLICT (role_id, permission_id) DO NOTHING`,
        [role.rows[0].id, permission.rows[0].id, role.rows[0].name, permission.rows[0].name]);
};