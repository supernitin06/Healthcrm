import pool from "../../../db/config.js";
import { generateCustomId } from "../../utils/idGenerator.js";

export const createPermissionTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS permissions (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        permission_type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
  try {
    await pool.query(query);
    console.log("✅ permissions table created");
  } catch (error) {
    console.error("❌ Error creating permissions table", error);
  }
}

export const insertDefaultRolePermissions = async () => {
  const permissions = [
    { name: 'CREATE_EMPLOYEE', type: 'employee' },
    { name: 'DELETE_EMPLOYEE', type: 'employee' },
    { name: 'UPDATE_EMPLOYEE', type: 'employee' },
    { name: 'VIEW_EMPLOYEE', type: 'employee' },
    { name: 'GET_EMPLOYEES', type: 'employee' },
    { name: 'GET_EMPLOYEE', type: 'employee' },
    { name: 'ADD_EMPLOYEE_TO_TEAM', type: 'employee' },
    { name: 'REMOVE_EMPLOYEE_FROM_TEAM', type: 'employee' },

    { name: 'CREATE_USER', type: 'user' },
    { name: 'DELETE_USER', type: 'user' },
    { name: 'UPDATE_USER', type: 'user' },
    { name: 'VIEW_USERS', type: 'user' },

    { name: 'CREATE_STAFF', type: 'staff' },
    { name: 'DELETE_STAFF', type: 'staff' },
    { name: 'UPDATE_STAFF', type: 'staff' },
    { name: 'GET_STAFF', type: 'staff' },

    { name: 'CREATE_ROLE', type: 'role' },
    { name: 'UPDATE_ROLE', type: 'role' },
    { name: 'DELETE_ROLE', type: 'role' },

    { name: 'CREATE_TEAM', type: 'team' },
    { name: 'DELETE_TEAM', type: 'team' },
    { name: 'UPDATE_TEAM', type: 'team' },
    { name: 'VIEW_TEAMS', type: 'team' },

    { name: 'CREATE_PLAN', type: 'plan' },
    { name: 'UPDATE_PLAN', type: 'plan' },
    { name: 'DELETE_PLAN', type: 'plan' },

    { name: 'CREATE_HEALTH_TEST', type: 'health_test' },
    { name: 'UPDATE_HEALTH_TEST', type: 'health_test' },
    { name: 'DELETE_HEALTH_TEST', type: 'health_test' },
    { name: 'GET_HEALTH_TEST', type: 'health_test' },
    { name: 'ASSIGN_HEALTH_TEST', type: 'health_test' },
    { name: 'GET_ASSIGNED_HEALTH_TEST', type: 'health_test' },
    { name: 'UPDATE_ASSIGNED_HEALTH_TEST', type: 'health_test' },
    { name: 'DELETE_ASSIGNED_HEALTH_TEST', type: 'health_test' },

    { name: 'CREATE_HEALTH_PACKAGE', type: 'health_package' },
    { name: 'UPDATE_HEALTH_PACKAGE', type: 'health_package' },
    { name: 'DELETE_HEALTH_PACKAGE', type: 'health_package' },
    { name: 'GET_HEALTH_PACKAGE', type: 'health_package' },
    { name: 'ASSIGN_HEALTH_PACKAGE', type: 'health_package' },
    { name: 'GET_ASSIGNED_HEALTH_PACKAGE', type: 'health_package' },
    { name: 'DELETE_ASSIGNED_HEALTH_PACKAGE', type: 'health_package' },

    { name: 'CREATE_PERMISSION', type: 'permission' },
    { name: 'ASSIGN_PERMISSION', type: 'permission' },
    { name: 'REMOVE_PERMISSION', type: 'permission' },
    { name: 'UPDATE_PERMISSION', type: 'permission' },
    { name: 'GET_PERMISSION', type: 'permission' }
  ];

  try {
    // Generate IDs and values for insertion
    // Since we cannot use executemany easily with PG client without a loop or building a big query
    // We will build a big query.

    // We use generateCustomId("PER") for each.
    // To avoid potential duplicate ID generation in a tight loop (depends on how random it is), 
    // we might want to ensure uniqueness. validation. 
    // But for now we trust `idGenerator`.

    // Construct the VALUES part ($1, $2, $3), ($4, $5, $6)...
    const values = [];
    const params = [];
    let paramIndex = 1;

    for (const perm of permissions) {
      const id = generateCustomId("PER");
      values.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2})`);
      params.push(id, perm.name, perm.type);
      paramIndex += 3;
    }

    const query = `
            INSERT INTO permissions (id, name, permission_type)
            VALUES ${values.join(", ")}
            ON CONFLICT (name) DO NOTHING;
        `;

    await pool.query(query, params);
    console.log("✅ Default permissions inserted");
  } catch (error) {
    console.error("❌ Error inserting permissions", error);
  }
};

export const createRolePermissionTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS role_permissions (
      id SERIAL PRIMARY KEY,
      role_id VARCHAR(50) NOT NULL,
      permission_id VARCHAR(50) NOT NULL,
      role_name VARCHAR(50) NOT NULL,
      permission_name VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      permission_assigned_by VARCHAR(50) NOT NULL,
      CONSTRAINT fk_role
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
      CONSTRAINT fk_permission
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
      UNIQUE (role_id, permission_id)
    );`;
  try {
    await pool.query(query);
    // Ensure permission_assigned_by exists if table was already there (backward compatibility attempt)
    await pool.query(`ALTER TABLE role_permissions ADD COLUMN IF NOT EXISTS permission_assigned_by VARCHAR(50)`);
    await pool.query(`ALTER TABLE role_permissions ADD COLUMN IF NOT EXISTS role_name VARCHAR(50)`);
    await pool.query(`ALTER TABLE role_permissions ADD COLUMN IF NOT EXISTS permission_name VARCHAR(50)`);
    console.log("✅ role_permissions table created");
  } catch (error) {
    console.error("❌ Error creating role_permissions table", error);
  }
};
