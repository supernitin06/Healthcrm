import { Router } from "express";
import { can } from "../../middlewares/Permission.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { registerStaffValidation } from "./validate/authstaff.validate.js";
import { registerStaffcontroller } from "./authstaff.controller.js";
import { loginStaffcontroller, updateStaffcontroller, getStaffcontroller, getStaffByIdcontroller } from "./authstaff.controller.js";
const router = Router();

router.post("/registerstaff",
    /* 
        #swagger.tags = ['staff'] 
    */
    authMiddleware, can("CREATE_STAFF"), registerStaffValidation, validateRequest, registerStaffcontroller);


    router.post("/loginstaff",
    /* 
        #swagger.tags = ['staff'] 
    */ loginStaffcontroller);
    
    router.put("/updatestaff/:id", authMiddleware,
    /* 
        #swagger.tags = ['staff'] 
    */
    authMiddleware, can("UPDATE_STAFF"), updateStaffcontroller);

    router.get("/getstaff", authMiddleware,
    /* 
        #swagger.tags = ['staff'] 
    */
    authMiddleware, can("GET_STAFF"), getStaffcontroller);

    router.get("/getstaff/:id", authMiddleware,
    /* 
        #swagger.tags = ['staff'] 
    */
    authMiddleware, can("GET_STAFF"), getStaffByIdcontroller);

export default router;