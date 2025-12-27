// import { seedRolePermissions } from "../src/seeder/roles.seed.js"; 
import { createUsersTable } from "../src/modules/authuser/authuser.model.js";
import { createTeamTable, insertDefaultTeams } from "../src/modules/team/team.model.js";
import { createRoleTable, insertDefaultRoles } from "../src/modules/role/role.model.js";
import { createPermissionTable, createRolePermissionTable, insertDefaultRolePermissions } from "../src/modules/permission/permission.model.js";
import { createStaffTable } from "../src/modules/authstaff/authstaff.model.js"; 
export const initDB = async () => {

  // CREATE CONSTANT TABLES
  await createRoleTable();
  await insertDefaultRoles();
  await createPermissionTable();
  await insertDefaultRolePermissions();
  await createRolePermissionTable();
  await createUsersTable();
  await createStaffTable();
  await createTeamTable();
  await insertDefaultTeams();



  // CREATE USER TABLE



};
