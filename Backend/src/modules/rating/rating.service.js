import pool from "../../../db/config.js";

const updateAverageRating = async (table, idColumn, id) => {
    // Determine the rating table based on the parent table name
    let ratingTable = "";
    if (table === "doctors") ratingTable = "doctor_ratings";
    if (table === "health_tests") ratingTable = "health_test_ratings";
    if (table === "staff") ratingTable = "staff_ratings";
    if (table === "insurance") ratingTable = "insurance_ratings";

    // Calculate new average
    const avgQuery = `SELECT ROUND(AVG(rating), 2) as average FROM ${ratingTable} WHERE ${idColumn} = $1`;
    const avgResult = await pool.query(avgQuery, [id]);
    const newAverage = avgResult.rows[0].average || 0;

    // Update parent table
    await pool.query(`UPDATE ${table} SET average_rating = $1 WHERE id = $2`, [newAverage, id]);
};

export const addRatingService = async (type, entityId, userId, data) => {
    const { rating, review_msg } = data;
    let query = "";
    let params = [entityId, userId, rating, review_msg];
    let parentTable = "";
    let idColumn = "";

    switch (type) {
        case "doctor":
            query = `INSERT INTO doctor_ratings (doctor_id, user_id, rating, review_msg) VALUES ($1, $2, $3, $4) RETURNING *`;
            parentTable = "doctors";
            idColumn = "doctor_id";
            break;
        case "health_test":
            query = `INSERT INTO health_test_ratings (health_test_id, user_id, rating, review_msg) VALUES ($1, $2, $3, $4) RETURNING *`;
            parentTable = "health_tests";
            idColumn = "health_test_id";
            break;
        case "staff":
            query = `INSERT INTO staff_ratings (staff_id, user_id, rating, review_msg) VALUES ($1, $2, $3, $4) RETURNING *`;
            parentTable = "staff";
            idColumn = "staff_id";
            break;
        case "insurance":
            query = `INSERT INTO insurance_ratings (insurance_id, user_id, rating, review_msg) VALUES ($1, $2, $3, $4) RETURNING *`;
            parentTable = "insurance";
            idColumn = "insurance_id";
            break;
        default:
            throw new Error("Invalid rating type");
    }

    const result = await pool.query(query, params);

    // Update the average in the parent table asynchronously
    await updateAverageRating(parentTable, idColumn, entityId);

    return result.rows[0];
};

export const getRatingsService = async (type, entityId) => {
    let query = "";
    switch (type) {
        case "doctor":
            query = `SELECT r.*, u.username FROM doctor_ratings r JOIN users u ON r.user_id = u.id WHERE doctor_id = $1 ORDER BY r.created_at DESC`;
            break;
        case "health_test":
            query = `SELECT r.*, u.username FROM health_test_ratings r JOIN users u ON r.user_id = u.id WHERE health_test_id = $1 ORDER BY r.created_at DESC`;
            break;
        case "staff":
            query = `SELECT r.*, u.username FROM staff_ratings r JOIN users u ON r.user_id = u.id WHERE staff_id = $1 ORDER BY r.created_at DESC`;
            break;
        case "insurance":
            query = `SELECT r.*, u.username FROM insurance_ratings r JOIN users u ON r.user_id = u.id WHERE insurance_id = $1 ORDER BY r.created_at DESC`;
            break;
        default:
            throw new Error("Invalid rating type");
    }
    const result = await pool.query(query, [entityId]);
    return result.rows;
};
