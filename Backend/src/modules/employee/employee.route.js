import { getEmployeeByIdController, getEmployeesController, addEmployeeInTeamController, removeEmployeeFromTeamController, getUserEmployeeListController, removeUserFromEmployeeListController, updateStatusOfUserController } from "./employee.controller.js";
import { authMiddleware } from "../../middlewares/authmiddlewere.js";
import { can } from "../../middlewares/Permission.js";
import { Router } from "express";
const router = Router();

router.get("/getEmployees",
    /* 
        #swagger.tags = ['Employee'] 
    */
    authMiddleware, can("GET_EMPLOYEES"), getEmployeesController);

router.get("/getEmployeeById",
    /* 
        #swagger.tags = ['Employee'] 
        #swagger.description = 'Get employee by id'
    */
    authMiddleware, can("GET_EMPLOYEE"), getEmployeeByIdController);

router.post("/addEmployeeInTeam",
    /* 
        #swagger.tags = ['Employee'] 
        #swagger.description = 'Add employee to team'
    */
    authMiddleware, can("ADD_EMPLOYEE_TO_TEAM"), addEmployeeInTeamController);

router.post("/removeEmployeeFromTeam",
    /* 
        #swagger.tags = ['Employee'] 
        #swagger.description = 'Remove employee from team'
    */
    authMiddleware, can("REMOVE_EMPLOYEE_FROM_TEAM"), removeEmployeeFromTeamController);

router.put("/updateEmployee",
    /* 
        #swagger.tags = ['Employee'] 
        #swagger.description = 'Update employee'
    */
    authMiddleware, can("UPDATE_EMPLOYEE"), addEmployeeInTeamController);

router.post("/addUserToEmployeeList",
    /* 
        #swagger.tags = ['Employee'] 
        #swagger.description = 'Add user to employee list'
    */
 authMiddleware, can("ADD_USER_TO_EMPLOYEE_LIST"), addEmployeeInTeamController);


router.get("/getUserFromEmployeeList",
    /* 
        #swagger.tags = ['Employee'] 
        #swagger.description = 'Get user employee list'
    */
    authMiddleware, can("GET_USER_EMPLOYEE_LIST"), getUserEmployeeListController);

router.put("/removeUserFromEmployeeList",
    /* 
        #swagger.tags = ['Employee'] 
        #swagger.description = 'Remove user from employee list'
    */
    authMiddleware, can("REMOVE_USER_FROM_EMPLOYEE_LIST"), removeUserFromEmployeeListController);

router.put("/updateStatusOfUser",
    /* 
        #swagger.tags = ['Employee'] 
        #swagger.description = 'Update status of user'
    */
    authMiddleware, can("UPDATE_STATUS_OF_USER"), updateStatusOfUserController);

export default router;