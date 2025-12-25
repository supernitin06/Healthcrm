import { Router } from "express";
import {
    createRoleController,
    getRolesController,
    getRoleByIdController,
    updateRoleController,
    deleteRoleController,
} from "./role.controller.js";
import { createRoleValidation, updateRoleValidation } from "./validate/role.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { can } from "../../middlewares/Permission.js";

const router = Router();
router.post("/",

    // #swagger.tags = ['Roles']
    authMiddleware, can("CREATE_ROLE"), createRoleValidation, validateRequest, createRoleController);

router.get("/",
    // #swagger.tags = ['Roles']
    getRolesController);
router.get("/:id",
    // #swagger.tags = ['Roles']
    authMiddleware, getRoleByIdController);

router.put("/:id",
    /* #swagger.tags = ['Roles'] */
    authMiddleware, can("UPDATE_ROLE"), updateRoleValidation, validateRequest, updateRoleController);

router.delete("/:id",
    /* #swagger.tags = ['Roles'] */
    authMiddleware, can("DELETE_ROLE"), deleteRoleController);
export default router;
