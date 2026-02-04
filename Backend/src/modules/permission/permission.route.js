import { Router } from "express";
import {
    getPermissionsController,
    getPermissionByIdController,
    assignPermissionController,
    removePermissionController,
    getRolePermissionsController,
    createPermissionController
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

router.post("/create",
    /* #swagger.tags = ['Permissions'] */
    /* #swagger.parameters['name'] = { in: 'body', required: true, type: 'string' } */
    /* #swagger.parameters['permission_type'] = { in: 'body', required: true, type: 'string' } */
    authMiddleware, can("CREATE_PERMISSION"), createPermissionController
);

router.post("/assign",
    /* #swagger.tags = ['Permissions'] */
    /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            role_id: { type: "integer" },
                            permission_id: { type: "integer" }
                        }
                    }
                }
            }
        }
    */
    authMiddleware, can("ASSIGN_PERMISSION"), ...assignPermissionValidation, (req, res, next) => {
        console.log("DEBUG /assign Body:", req.body);
        console.log("DEBUG /assign Content-Type:", req.headers['content-type']);
        next();
    }, validateRequest, assignPermissionController);


router.post("/remove",
    /* #swagger.tags = ['Permissions'] */
    authMiddleware, can("REMOVE_PERMISSION"), assignPermissionValidation, validateRequest, removePermissionController); // Reusing validation as fields are same


router.get("/role/:roleId",
    /* #swagger.tags = ['Permissions'] */
    authMiddleware, getRolePermissionsController);




export default router;
