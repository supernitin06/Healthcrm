import pool from "../../../db/config.js";
import { generateCustomId } from "../../utils/idGenerator.js";


export const createOffer = async (offer) => {
    const id = generateCustomId("OFF");
    const query = `
    INSERT INTO offer (id, name, description, price, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [id, offer.name, offer.description, offer.price, offer.created_at, offer.updated_at]);
        console.log("✅ Offer created successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error creating offer:", error);
        throw error;
    }
};

export const getOffers = async () => {
    const query = `SELECT * FROM offer;`;
    try {
        const result = await pool.query(query);
        console.log("✅ Offers retrieved successfully");
        return result.rows;
    } catch (error) {
        console.error("❌ Error retrieving offers:", error);
        throw error;
    }
};

export const updateOffer = async (offerId, offer) => {
    const query = `
    UPDATE offer
    SET name = $2, description = $3, price = $4, updated_at = $5
    WHERE id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [offerId, offer.name, offer.description, offer.price, offer.updated_at]);
        console.log("✅ Offer updated successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error updating offer:", error);
        throw error;
    }
};

export const deleteOffer = async (offerId) => {
    const query = `
    DELETE FROM offer
    WHERE id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [offerId]);
        console.log("✅ Offer deleted successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error deleting offer:", error);
        throw error;
    }
};

export const assignOfferToUser = async (offerId, userId) => {
    const query = `
    INSERT INTO users_offer (user_id, offer_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [userId, offerId]);
        console.log("✅ Offer assigned to user successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error assigning offer to user:", error);
        throw error;
    }
};

export const getassignOfferToUser = async (userId) => {
    const query = `
    SELECT * FROM users_offer
    WHERE user_id = $1;
  `;
    try {
        const result = await pool.query(query, [userId]);
        console.log("✅ Offer retrieved successfully");
        return result.rows;
    } catch (error) {
        console.error("❌ Error retrieving offer:", error);
        throw error;
    }
};


export const deleteassignOfferToUser = async (userId) => {
    const query = `
    DELETE FROM users_offer
    WHERE user_id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [userId]);
        console.log("✅ Offer deleted successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error deleting offer:", error);
        throw error;
    }
};

export const updateassignOfferToUser = async (userId, offerId) => {
    const query = `
    UPDATE users_offer
    SET offer_id = $2
    WHERE user_id = $1
    RETURNING *;
  `;
    try {
        const result = await pool.query(query, [userId, offerId]);
        console.log("✅ Offer updated successfully");
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error updating offer:", error);
        throw error;
    }
};

