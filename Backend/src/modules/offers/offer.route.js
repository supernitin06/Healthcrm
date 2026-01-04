import Router from "express";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { can } from "../../middlewares/Permission.js";
import {
    CreateOfferscontroller,
    GetOfferscontroller,
    UpdateOfferscontroller,
    DeleteOfferscontroller,
    AssignOfferToUserController,
    GetAssignedOfferscontroller,
    UpdateAssignedOfferscontroller,
    DeleteAssignedOfferscontroller
} from "./offer.controller.js";
const router = Router();

router.post("/create",
    /* #swagger.tags = ['Offers'] */
    can("create offer"),
    authMiddleware, CreateOfferscontroller);
router.get("/get",
    /* #swagger.tags = ['Offers'] */
    can("get offer"),
    authMiddleware, GetOfferscontroller);
router.put("/update/:id",
    /* #swagger.tags = ['Offers'] */
    can("update offer"),
    authMiddleware, UpdateOfferscontroller);
router.delete("/delete/:id",
    /* #swagger.tags = ['Offers'] */
    can("delete offer"),
    authMiddleware, DeleteOfferscontroller);
router.post("/assign/:id",
    /* #swagger.tags = ['UsersOffers'] */
    can("assign offer"),
    authMiddleware, AssignOfferToUserController);
router.get("/assigned/:id",
    /* #swagger.tags = ['UsersOffers'] */
    can("get assigned offer"),
    authMiddleware, GetAssignedOfferscontroller);
router.put("/updateassigned/:id",
    /* #swagger.tags = ['UsersOffers'] */
    can("update assigned offer"),
    authMiddleware, UpdateAssignedOfferscontroller); 
router.delete("/deleteassigned/:id",
    /* #swagger.tags = ['UsersOffers'] */
    can("delete assigned offer"),
    authMiddleware, DeleteAssignedOfferscontroller);

export default router;