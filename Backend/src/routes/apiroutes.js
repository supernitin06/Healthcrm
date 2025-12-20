import { Router } from "express";
import authRoutes from "../modules/auth/auth.route.js";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/admin", adminRoutes);
// router.use("/staff", staffRoutes);

export default router;
