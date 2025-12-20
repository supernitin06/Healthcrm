import { Router } from "express";
import { can } from "../../middlewares/Permission.js";
import { registerUserController } from "./auth.control.js";
import { registerValidation, registerStaffValidation } from "./auth.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { loginController } from "./auth.control.js";
import { loginValidation } from "./auth.validation.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";  
const router = Router();

router.post("/register", registerValidation, validateRequest, registerUserController);
router.post("/registerstaff",authMiddleware, can("CREATE_STAFF"), registerStaffValidation, validateRequest, registerUserController);
router.post("/login",  loginValidation, validateRequest, loginController );

export default router;