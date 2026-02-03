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
import { seedRolePermissions } from "../src/seeder/roles.seed.js";
import { DoctorTable as createDoctorTable } from "../src/modules/doctor/doctors.model.js";
import { DoctorPatientTable as createDoctorAppoitmentTable } from "../src/modules/doctor/doctors.model.js";
import { MedicalHistoryTable } from "../src/modules/medical_history/medical_history.model.js";
import { createRatingTables } from "../src/modules/rating/rating.model.js";
import { createClaimTable } from "../src/modules/claim/claim.model.js";
export const initDB = async () => {
  console.log("🔄 Initializing Database...");

  // CREATE CONSTANT TABLES
  console.log("... Creating roles table");
  await createRoleTable();
  await insertDefaultRoles();

  console.log("... Creating teams table");
  await createTeamTable();
  await insertDefaultTeams();

  console.log("... Creating permission table");
  await createPermissionTable();
  await insertDefaultRolePermissions();
  await createRolePermissionTable();

  console.log("... Creating users table");
  await createUsersTable();

  console.log("... Creating staff table");
  await createStaffTable();

  console.log("... Creating employee table");
  await AssignUserToEmployeeTable();

  console.log("... Creating insurance table");
  await createInsuranceTable();
  await UserInsuranceTable();

  console.log("... Creating offer table");
  await createOfferTable();
  await UsersOfferTable();

  console.log("... Creating health test table");
  await createHealthTestTable();
  await UserHealthTestTable();

  console.log("... Creating health package table");
  await createHealthPackageTable();
  await createHealthPackageTestsTable();
  await UserHealthPackageTable();

  console.log("... Seeding permissions");
  await seedRolePermissions();

  console.log("... Creating doctor tables");
  await createDoctorTable();
  await createDoctorAppoitmentTable();

  console.log("... Creating remaining tables");
  await MedicalHistoryTable();
  await createRatingTables();
  console.log("... Creating claim table");
  await createClaimTable();

  // CREATE INDEXES
  await createIndexes();



  // CREATE USER TABLE



};
