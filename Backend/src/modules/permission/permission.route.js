import { Router } from "express";
import {
    getPermissionsController,
    getPermissionByIdController,
    assignPermissionController,
    removePermissionController,
    getRolePermissionsController
} from "./permission.controller.js";
import { assignPermissionValidation } from "./validate/permission.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { can } from "../../middlewares/Permission.js";

const router = Router();

router.get("/",
    /* #swagger.tags = ['Permissions'] */
    /* #swagger.summary = 'Get all permissions' */
    authMiddleware, getPermissionsController);



router.get("/:id",
    /* #swagger.tags = ['Permissions'] */
    authMiddleware, getPermissionByIdController);

router.post("/assign",
    /* #swagger.tags = ['Permissions'] */
    authMiddleware, can("CREATE_PERMISSION"), assignPermissionValidation, validateRequest, assignPermissionController);


router.post("/remove",
    /* #swagger.tags = ['Permissions'] */
    authMiddleware, can("DELETE_PERMISSION"), assignPermissionValidation, validateRequest, removePermissionController); // Reusing validation as fields are same


router.get("/role/:roleId",
    /* #swagger.tags = ['Permissions'] */
    authMiddleware, getRolePermissionsController);



router.post("/assigning",
    /* #swagger.tags = ['Permissions'] */
    authMiddleware, can("CREATE_PERMISSION"), assignPermissionValidation, validateRequest, assignPermissionController);    
export default router;
