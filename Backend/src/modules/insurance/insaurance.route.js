import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { createInsuranceController, assignInsuranceToUserController, getAssignInsuranceToUserController, deleteAssignInsuranceToUserController, getInsuranceController, deleteInsuranceController, updateInsuranceController } from "./insaurance.controller.js";
import Router from "express";
import { can } from "../../middlewares/Permission.js";
const router = Router();

router.post("/createinsurance",
    /* #swagger.tags = ['Insurance'] */
    can("create insurance"), authMiddleware, createInsuranceController);
router.post("/assigninsurance",
    /* #swagger.tags = ['Insurance'] */
    can("assign insurance"), authMiddleware, assignInsuranceToUserController);
router.get("/getassigninsurance/:id",
    /* #swagger.tags = ['Insurance'] */
    can("get assign insurance"), authMiddleware, getAssignInsuranceToUserController);
router.delete("/deleteassigninsurance/:id",
    /* #swagger.tags = ['Insurance'] */
    can("delete assign insurance"), authMiddleware, deleteAssignInsuranceToUserController);
router.get("/getinsurance",
    /* #swagger.tags = ['Insurance'] */
    can("get insurance"), authMiddleware, getInsuranceController);
router.delete("/deleteinsurance/:id",
    /* #swagger.tags = ['Insurance'] */
    can("delete insurance"), authMiddleware, deleteInsuranceController);
router.put("/updateinsurance",
    /* #swagger.tags = ['Insurance'] */
    can("update insurance"), authMiddleware, updateInsuranceController);

export default router;