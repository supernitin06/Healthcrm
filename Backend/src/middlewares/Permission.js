import pool from "../../db/config.js";

export const can = (permission) => {
  return async (req, res, next) => {
    try {
      const role_id = req.user.role_id;

      if (!role_id) {
        return res.status(403).json({ message: "You don't have permission to perform this action" });
      }

      if (role_id === 1) {
        return next();
      }

      const roleResult = await pool.query("SELECT name FROM roles WHERE id = $1", [role_id]);

      if (roleResult.rows.length === 0) {
        return res.status(403).json({ message: "Role not found" });
      }

      const role_name = roleResult.rows[0].name;

      if (role_name === "Superadmin") {
        return next();
      }
 
      const permissionResult = await pool.query("SELECT id FROM permissions WHERE name = $1", [permission]);

      if (permissionResult.rows.length === 0) {
        return res.status(403).json({ message: `Permission '${permission}' not found` });
      }

      const permission_id = permissionResult.rows[0].id;
      const role_permission = await pool.query(
        "SELECT * FROM role_permissions WHERE role_id = $1 AND permission_id = $2",
        [role_id, permission_id]
      );

      if (role_permission.rows.length > 0) {
        return next();
      } else {
        return res.status(403).json({ message: `${role_name} does not have permission to perform this action: ${permission}` });
      }
    } catch (error) {
      console.error("Middleware error:", error);
      return res.status(500).json({ message: "Internal Server Error during permission check" });
    }
  }
}