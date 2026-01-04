import { Router } from "express";
import authRoutes from "../modules/authuser/authuser.route.js";
import roleRoutes from "../modules/role/role.route.js";
import permissionRoutes from "../modules/permission/permission.route.js";
import teamRoutes from "../modules/team/team.route.js";
import staffRoutes from "../modules/authstaff/authstaff.route.js";
import employeeRoutes from "../modules/employee/employee.route.js";
import insuranceRoutes from "../modules/insurance/insaurance.route.js";
import offerRoutes from "../modules/offers/offer.route.js";
import healthTestRoutes from "../modules/health_test/health_test.route.js";
import healthPackageRoutes from "../modules/health_package/health_package.route.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/teams", teamRoutes);
router.use("/staff", staffRoutes);
router.use("/employees", employeeRoutes);
router.use("/insurance", insuranceRoutes);
router.use("/offers", offerRoutes);
router.use("/health-tests", healthTestRoutes);
router.use("/health-packages", healthPackageRoutes);
// router.use("/admin", adminRoutes);

export default router;