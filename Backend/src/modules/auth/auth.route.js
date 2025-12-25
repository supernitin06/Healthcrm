import { Router } from "express";
import { can } from "../../middlewares/Permission.js";
import { registerUserController } from "./auth.control.js";
import { registerValidation, registerStaffValidation } from "./auth.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { loginController } from "./auth.control.js";
import { loginValidation } from "./auth.validation.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
const router = Router();


router.post("/register",
    /* 
        #swagger.tags = ['Auth']
        #swagger.summary = 'User self registration'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            username: { type: "string", example: "John Doe" },
                            email: { type: "string", example: "john@example.com" },
                            password: { type: "string", example: "password123" }
                        },
                        required: ["username", "email", "password"]
                    }
                }
            }
        } 
    */
    registerValidation, validateRequest, registerUserController);

router.post("/registerstaff",
    /* 
        #swagger.tags = ['Auth'] 
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            username: { type: "string", example: "Staff Member" },
                            email: { type: "string", example: "staff@example.com" },
                            password: { type: "string", example: "password123" },
                            role_id: { type: "integer", example: 1 },
                            role_name: { type: "string", example: "Staff" },
                            team_id: { type: "integer", example: 1 },
                            team_name: { type: "string", example: "Team" }
                        },
                        required: ["username", "email", "password", "role_id", "role_name", "team_id", "team_name"]
                    }
                }
            }
        }
    */
    authMiddleware, can("CREATE_STAFF"), registerStaffValidation, validateRequest, registerUserController);

router.post("/login",
    /* 
        #swagger.tags = ['Auth']
       
    */
    loginValidation, validateRequest, loginController);

export default router;