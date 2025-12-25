import { Router } from "express";
import {
    createTeamController,
    getTeamsController,
    getTeamByIdController,
    updateTeamController,
    deleteTeamController,
} from "./team.controller.js";
import { createTeamValidation, updateTeamValidation } from "./validate/team.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { can } from "../../middlewares/Permission.js";

const router = Router();




router.post("/",
    // #swagger.tags = ['Teams']
    authMiddleware, can("CREATE_TEAM"), createTeamValidation, validateRequest, createTeamController);

router.get("/",
    // #swagger.tags = ['Teams']
    authMiddleware, can("VIEW_TEAMS"), getTeamsController);

router.get("/:id",
    // #swagger.tags = ['Teams']
    authMiddleware, can("VIEW_TEAMS"), getTeamByIdController);

router.put("/:id",
    // #swagger.tags = ['Teams']
    authMiddleware, can("UPDATE_TEAM"), updateTeamValidation, validateRequest, updateTeamController); // Assuming create team perm implies update
router.delete("/:id",
    // #swagger.tags = ['Teams']
    authMiddleware, can("DELETE_TEAM"), deleteTeamController);

export default router;
