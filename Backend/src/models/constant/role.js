import pool from "../../../db/config.js";

export const createRoleTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE
    );
  `;

    try {
        await pool.query(query);
        console.log("✅ roles table created");
    } catch (error) {
        console.error("❌ Error creating roles table", error);
    }
};


export const insertDefaultRoles = async () => {
    const query = `
    INSERT INTO roles (name) VALUES
    ('user'),
    ('admin'),
    ('superadmin'),
    ('staff')
    ON CONFLICT (name) DO NOTHING;
    `;

    try {
        await pool.query(query);
        console.log("✅ Roles inserted successfully");
    } catch (error) {
        console.error("❌ Error inserting roles", error);
    }
};


export const createPermissionTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS permissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
    );`;
    try {
        await pool.query(query);
        console.log("✅ permissions table created");
    }
    catch (error) {
        console.error("❌ Error creating permissions table", error);
    }

}


export const insertDefaultRolePermissions = async () => {
    const query = `
    INSERT INTO permissions (name)
    VALUES
      ('CREATE_STAFF'),
      ('DELETE_STAFF'),
      ('VIEW_USERS'),
      ('CREATE_PLAN'),
      ('UPDATE_PLAN'),
      ('DELETE_PLAN')
    ON CONFLICT (name) DO NOTHING;
  `;

    try {
        await pool.query(query);
        console.log("✅ Default permissions inserted");
    } catch (error) {
        console.error("❌ Error inserting permissions", error);
    }
};





export const createRolePermissionTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS role_permissions (
      id SERIAL PRIMARY KEY,
      role_id INT NOT NULL,
      permission_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_role
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,

      CONSTRAINT fk_permission
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,

      UNIQUE (role_id, permission_id)
    );`;
    try {
        await pool.query(query);
        console.log("✅ role_permissions table created");
    }
    catch (error) {
        console.error("❌ Error creating role_permissions table", error);
    }
};

export const assignPermissionToRole = async (roleName, permissionName) => {
  const query = `
    INSERT INTO role_permissions (role_id, permission_id)
    VALUES (
      (SELECT id FROM roles WHERE name = $1),
      (SELECT id FROM permissions WHERE name = $2)
    )
    ON CONFLICT DO NOTHING;
  `;
  try {
    await pool.query(query, [roleName, permissionName]);
    console.log(`✅ ${permissionName} assigned to ${roleName}`);
  } catch (error) {
    console.error("❌ Error assigning permission", error);
  }
};


