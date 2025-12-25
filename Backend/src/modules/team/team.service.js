import pool from "../../../db/config.js";

export const createTeamService = async (name) => {
    const result = await pool.query(
        "INSERT INTO teams (name) VALUES ($1) RETURNING *",
        [name]
    );
    return result.rows[0];
};

export const getTeamsService = async () => {
    const result = await pool.query("SELECT * FROM teams");
    return result.rows;
};

export const getTeamByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM teams WHERE id = $1", [id]);
    return result.rows[0];
};

export const updateTeamService = async (id, name) => {
    const result = await pool.query(
        "UPDATE teams SET name = $2 WHERE id = $1 RETURNING *",
        [id, name]
    );
    return result.rows[0];
};

export const deleteTeamService = async (id) => {
    const result = await pool.query("DELETE FROM teams WHERE id = $1 RETURNING *", [
        id,
    ]);
    return result.rows[0];
};
