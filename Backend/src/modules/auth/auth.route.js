import { Router } from "express";
import { can } from "../../middlewares/Permission.js";
import { registerUserController } from "./auth.control.js";
import { registerValidation, registerStaffValidation } from "./auth.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";

const router = Router();

router.post("/register", registerValidation, validateRequest, registerUserController);
router.post("/registerstaff", can("CREATE_STAFF"), registerStaffValidation, validateRequest, registerUserController);


export default router;