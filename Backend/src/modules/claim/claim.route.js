
import { Router } from "express";
import { ApplyClaimController, GetClaimController, GetClaimByIdController, ApproveClaimController } from "./claim.controller.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { createUploader } from "../../middlewares/coloudinary/cloudinary.js";

const router = Router();

router.post("/apply-claim",
    /* 
        #swagger.tags = ['Claim']
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['user_id'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['insurance_id'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['claim_amount'] = { in: 'formData', required: true, type: 'number' }
        #swagger.parameters['reason'] = { in: 'formData', required: true, type: 'string' }
        #swagger.parameters['claim_documents'] = {
            in: 'formData',
            type: 'file',
            required: true,
            description: 'Claim documents'
        }
    */
    authMiddleware,
    createUploader("claims").single("claim_documents"),
    ApplyClaimController
);

router.get("/get-claim",
    /* 
        #swagger.tags = ['Claim']
    */
    authMiddleware,
    GetClaimController
);

router.get("/get-claim/:id",
    /* 
        #swagger.tags = ['Claim']
    */
    authMiddleware,
    GetClaimByIdController
);

router.put("/approve-claim/:id",
    /* 
        #swagger.tags = ['Claim']
        #swagger.parameters['status'] = { in: 'body', required: true, type: 'string' }
        #swagger.parameters['approved_amount'] = { in: 'body', required: true, type: 'number' }
    */
    authMiddleware,
    ApproveClaimController
);

export default router;
