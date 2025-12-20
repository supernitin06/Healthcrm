import pool from "../../db/config.js";

export const can = (permission) => {
    return async (req, res, next) => {
      const role_id = req.user.role_id;
      const permission_id = await pool.query("SELECT id FROM permissions WHERE name = $1", [permission]);
      const role_permission = await pool.query("SELECT * FROM role_permissions WHERE role_id = $1 AND permission_id = $2", [role_id, permission_id.rows[0].id]);
      if (role_permission.rows.length > 0) {
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    }
    
}