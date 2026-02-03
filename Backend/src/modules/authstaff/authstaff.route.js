import { Router } from "express";
import { can } from "../../middlewares/Permission.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { registerStaffValidation } from "./validate/authstaff.validate.js";
import { registerStaffcontroller, registerSuperAdminController } from "./authstaff.controller.js";
import { loginStaffcontroller, updateStaffcontroller, getStaffcontroller, getStaffByIdcontroller } from "./authstaff.controller.js";
import { createUploader } from "../../middlewares/coloudinary/cloudinary.js";
import multer from "multer";
const router = Router();

router.post("/registersuperadmin",
    /* 
        #swagger.tags = ['staff']
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['username'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['email'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['password'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['role_id'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['profile_image'] = {
            in: 'formData',
            type: 'file',
            required: true,
            description: 'Profile image to upload'
        }
    */

    createUploader("superadmin").single("profile_image"),
    registerSuperAdminController
);

router.post("/registerstaff",
    /* 
        #swagger.tags = ['staff'] 
    */
    authMiddleware, can("CREATE_STAFF"), createUploader("staff").single("profile_image"), registerStaffValidation, validateRequest, registerStaffcontroller);


router.post("/loginstaff",
    /* 
        #swagger.tags = ['staff'] 
    */ loginStaffcontroller);

router.put("/updatestaff/:id", authMiddleware,
    /* 
        #swagger.tags = ['staff'] 
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            username: { type: "string", example: "newusername" },
                            email: { type: "string", example: "new@email.com" },
                            password: { type: "string", example: "newpassword" },
                            role_id: { type: "integer", example: 2 }
                        }
                    }
                }
            }
        }
    */
    can("UPDATE_STAFF"), updateStaffcontroller);

router.get("/getstaff", authMiddleware,
    /* 
        #swagger.tags = ['staff'] 
    */
    can("GET_STAFF"), getStaffcontroller);

router.get("/getstaff/:id", authMiddleware,
    /* 
        #swagger.tags = ['staff'] 
    */
    can("GET_STAFF"), getStaffByIdcontroller);

export default router;