import pool from "../../../db/config.js";
import { getTeamByIdService } from "../team/team.service.js";


export const getEmployeesService = async () => {
    const { rows } = await pool.query(`SELECT * FROM staff where role_name='employee'`);
    return rows;
}

export const getEmployeeByIdService = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM staff where id=$1`, [id]);
    return rows[0];
}


export const addEmployeeInTeamService = async (employeeId, teamId) => {
    const team = await getTeamByIdService(teamId);
    if (!team) {
        throw new Error("Team not found");
    }
    const { rows } = await pool.query(
        `UPDATE staff 
         SET team_id=$1 
         WHERE id=$2 
         RETURNING *`,
        [teamId, employeeId]
    );
    if (rows.length === 0) {
        throw new Error("Employee not found");
    }

    return rows[0];
};

export const removeEmployeeFromTeamService = async (employeeId) => {
    const { rows } = await pool.query(`UPDATE staff SET team_id=null, team_name=null WHERE id=$1`, [employeeId]);
    return rows[0];
};


export const AddUserToEmployeeListService = async (employeeId, userId, userName, userEmail) => {    
    const { rows } = await pool.query(
        `INSERT INTO EmployeeUserAssignTable (employee_id, user_id, user_name, user_email)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [employeeId, userId, userName, userEmail]
    );
    return rows[0];
}


export const getUserEmployeeListService = async (employeeId) => {
    const { rows } = await pool.query(`SELECT * FROM EmployeeUserAssignTable where employee_id=$1`, [employeeId]);
    return rows;
}


export const removeUserFromEmployeeListService = async (employeeId, userId) => {
    const { rows } = await pool.query(`DELETE FROM EmployeeUserAssignTable where employee_id=$1 and user_id=$2`, [employeeId, userId]);
    return rows[0];
}


export const updateStatusOfUserService = async (userId, status) => {
    const { rows } = await pool.query(`UPDATE EmployeeUserAssignTable SET user_status=$1 where user_id=$2`, [status, userId]);
    return rows[0];
}