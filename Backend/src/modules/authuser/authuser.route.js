import { Router } from "express";
import { can } from "../../middlewares/Permission.js";
import { getUserByIdController, getUserController, registerUserController, updateUserController } from "./authuser.control.js";
import { registerValidation } from "./authuser.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { loginController } from "./authuser.control.js";
import { loginValidation } from "./authuser.validation.js";
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



router.post("/login",
    /* 
        #swagger.tags = ['Auth']
       
    */
loginValidation, validateRequest, loginController);

router.put("/updateuser/:id", authMiddleware,
    /* 
        #swagger.tags = ['Auth']
       
    */
updateUserController);


router.get("/getuser", authMiddleware,
    /* 
        #swagger.tags = ['Auth']
       
    */
getUserController);


router.get("/getuser/:id", authMiddleware,
    /* 
        #swagger.tags = ['Auth']
       
    */
getUserByIdController);



export default router;