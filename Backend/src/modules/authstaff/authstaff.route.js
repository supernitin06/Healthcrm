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
    upload.single("profile_image"),
    /* 
        #swagger.tags = ['staff']
        #swagger.consumes = ['multipart/form-data']
    
        #swagger.parameters['profile_image'] = { in: 'formData', type: 'file', required: true, description: 'Profile Image' }
    */

    createUploader("superadmin").single("profile_image"),
    registerSuperAdminController
);

router.post("/registerstaff",
    authMiddleware, can("CREATE_STAFF"), upload.single("profile_image"), registerStaffValidation, validateRequest,
    /* 
        #swagger.tags = ['staff'] 
        #swagger.consumes = ['multipart/form-data']

        #swagger.parameters['profile_image'] = { in: 'formData', type: 'file', required: true, description: 'Profile Image' }
    */
    registerStaffcontroller);
    authMiddleware, can("CREATE_STAFF"), createUploader("staff").single("profile_image"), registerStaffValidation, validateRequest, registerStaffcontroller);


router.post("/loginstaff",
    /* 
        #swagger.tags = ['staff'] 
            
     
    */
    loginStaffcontroller);

router.put("/updatestaff/:id", authMiddleware, can("UPDATE_STAFF"), upload.single("profile_image"),
    /* 
        #swagger.tags = ['staff'] 
        #swagger.consumes = ['multipart/form-data']
   
        #swagger.parameters['profile_image'] = { in: 'formData', type: 'file', description: 'Profile Image' }
    */
    updateStaffcontroller);

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