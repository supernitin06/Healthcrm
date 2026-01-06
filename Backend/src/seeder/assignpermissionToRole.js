
import pool from "../../db/config.js";

export const assignPermissionToRole = async (roleName, permissionName) => {
    const role = await pool.query(`SELECT id FROM roles WHERE name = $1`, [roleName]);
    const permission = await pool.query(`SELECT id FROM permissions WHERE name = $1`, [permissionName]);
    if (role.rows.length === 0 || permission.rows.length === 0) {
        throw new Error("Role or permission not found");
    }
    await pool.query(`INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT (role_id, permission_id) DO NOTHING`, [role.rows[0].id, permission.rows[0].id]);
};