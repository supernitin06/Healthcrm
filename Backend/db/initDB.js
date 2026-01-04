// import { seedRolePermissions } from "../src/seeder/roles.seed.js"; 
import { createUsersTable } from "../src/modules/authuser/authuser.model.js";
import { createTeamTable, insertDefaultTeams } from "../src/modules/team/team.model.js";
import { createRoleTable, insertDefaultRoles } from "../src/modules/role/role.model.js";
import { createPermissionTable, createRolePermissionTable, insertDefaultRolePermissions } from "../src/modules/permission/permission.model.js";
import { createStaffTable } from "../src/modules/authstaff/authstaff.model.js";
import { AssignUserToEmployeeTable } from "../src/modules/employee/employee.model.js";
import { createInsuranceTable } from "../src/modules/insurance/insaurance.model.js";
import { UserInsuranceTable } from "../src/modules/insurance/insaurance.model.js";
import { createOfferTable, UsersOfferTable } from "../src/modules/offers/offer.model.js";
import { createHealthTestTable, UserHealthTestTable } from "../src/modules/health_test/health_test.model.js";
import { createHealthPackageTable, createHealthPackageTestsTable, UserHealthPackageTable } from "../src/modules/health_package/health_package.model.js";
import { createIndexes } from "./indexes.js";

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
  await AssignUserToEmployeeTable();
  await createInsuranceTable();
  await UserInsuranceTable();
  await createOfferTable();
  await UsersOfferTable();
  await createHealthTestTable();
  await UserHealthTestTable();
  await createHealthPackageTable();
  await createHealthPackageTestsTable();
  await UserHealthPackageTable();

  // CREATE INDEXES
  await createIndexes();



  // CREATE USER TABLE



};
