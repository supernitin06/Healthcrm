

import { getEmployeesService, getEmployeeByIdService, addEmployeeInTeamService, removeEmployeeFromTeamService, AddUserToEmployeeListService, getUserEmployeeListService, updateStatusOfUserService, removeUserFromEmployeeListService } from "./employee.service.js";


export const getEmployeesController = async (req, res) => {
    try {
        const employees = await getEmployeesService();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getEmployeeByIdController = async (req, res) => {
    try {
        const employee = await getEmployeeByIdService(req.params.id);
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addEmployeeInTeamController = async (req, res) => {
    try {
        const { employeeId, teamId } = req.body;

        if (!employeeId || !teamId) {
            return res.status(400).json({ message: "employeeId and teamId are required" });
        }

        const employee = await addEmployeeInTeamService(employeeId, teamId);
        res.status(200).json(employee);

    } catch (error) {
        if (error.message === "Team not found" || error.message === "Employee not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const removeEmployeeFromTeamController = async (req, res) => {
    try {
        const { employeeId } = req.body;

        if (!employeeId) {
            return res.status(400).json({ message: "employeeId is required" });
        }

        const employee = await removeEmployeeFromTeamService(employeeId);
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const AddUserToEmployeeListController = async (req, res) => {
    try {
        const { employeeId, userId , userName, userEmail} = req.body;

        if (!employeeId || !userId || !userName || !userEmail || !userStatus) {
            return res.status(400).json({ message: "employeeId, userId, userName, userEmail and userStatus are required" });
        }

        const employee = await  AddUserToEmployeeListService(employeeId, userId, userName, userEmail);
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getUserEmployeeListController = async (req, res) => {
    try {
        const employee = await getUserEmployeeListService(req.params.id);
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const removeUserFromEmployeeListController = async (req, res) => {
    try {
        const employee = await removeUserFromEmployeeListService(req.params.id);
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateStatusOfUserController = async (req, res) => {
    try {
        const { userId, userStatus } = req.body;

        if (!userId || !userStatus) {
            return res.status(400).json({ message: "userId and userStatus are required" });
        }
        const employee = await updateStatusOfUserService(userId, userStatus);
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};