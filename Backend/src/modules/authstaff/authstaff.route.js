import { Router } from "express";
import { can } from "../../middlewares/Permission.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { registerStaffValidation } from "./validate/authstaff.validate.js";
import { registerStaffcontroller } from "./authstaff.controller.js";
import { loginStaffcontroller } from "./authstaff.controller.js";
const router = Router();

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
    authMiddleware, can("CREATE_STAFF"), registerStaffValidation, validateRequest, registerStaffcontroller);


    router.post("/loginstaff",
    /* 
        #swagger.tags = ['Auth'] 
    */
    authMiddleware, can("LOGIN_STAFF"), loginStaffcontroller);


export default router;