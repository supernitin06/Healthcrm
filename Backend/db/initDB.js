// import { seedRolePermissions } from "../src/seeder/roles.seed.js"; 
import { authtable } from "../src/models/user/auth.model.js";
import { createTeamTable, insertDefaultTeams } from "../src/models/teams/team.js";
import { createRoleTable, insertDefaultRoles } from "../src/models/role/role.js";
import { createPermissionTable, createRolePermissionTable, insertDefaultRolePermissions } from "../src/models/permission/permission.js";
export const initDB = async () => {

    // CREATE CONSTANT TABLES
  await createRoleTable();
  await insertDefaultRoles();
  await createPermissionTable();
  await insertDefaultRolePermissions();
  await createRolePermissionTable();
  // await seedRolePermissions(); 
  await createTeamTable();
  await insertDefaultTeams();



   // CREATE USER TABLE

   await authtable();
   

};
