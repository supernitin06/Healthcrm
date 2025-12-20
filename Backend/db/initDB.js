import { createRoleTable, insertDefaultRoles, createPermissionTable, insertDefaultRolePermissions , createRolePermissionTable } from "../src/models/constant/role.js";
import { seedRolePermissions } from "../src/seeder/roles.seed.js"; 
import { authtable } from "../src/models/user/auth.model.js";
export const initDB = async () => {

    // CREATE CONSTANT TABLES
  await createRoleTable();
  await insertDefaultRoles();
  await createPermissionTable();
  await insertDefaultRolePermissions();
  await createRolePermissionTable();
  await seedRolePermissions(); 



   // CREATE USER TABLE

   await authtable();
   

};
