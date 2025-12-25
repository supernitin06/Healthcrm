import { Router } from "express";
import authRoutes from "../modules/auth/auth.route.js";
import roleRoutes from "../modules/role/role.route.js";
import permissionRoutes from "../modules/permission/permission.route.js";
import teamRoutes from "../modules/team/team.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/teams", teamRoutes);
// router.use("/admin", adminRoutes);
// router.use("/staff", staffRoutes);

export default router;
