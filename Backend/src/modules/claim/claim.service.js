import pool from "../../../db/config.js";
import { getAssignInsuranceToUser } from "../insurance/insaurance.service.js";
import { generateCustomId } from "../../utils/idGenerator.js";


export const ApplyClaimService = async ({ user_id, insurance_id, claim_amount, documents_upload,
    reason, status, approved_amount, rejected_amount, approved_by, rejected_by, approved_at, rejected_at }, creator) => {

    const Createdby = creator ? creator.id : null;
    const Updatedby = creator ? creator.id : null;
    const createdbyname = creator ? creator.username : null;
    const updatedbyname = creator ? creator.username : null;

    const id = generateCustomId("CLM");

    try {
        const { rows } = await pool.query(
            `
            INSERT INTO claims (id, user_id, insurance_id, claim_amount, documents_upload, 
                reason, status, approved_amount, rejected_amount, approved_by, rejected_by, approved_at, rejected_at,
                created_by, updated_by, created_by_name, updated_by_name)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING *;
            `,
            [id, user_id, insurance_id, claim_amount, documents_upload, reason, status,
                approved_amount, rejected_amount, approved_by, rejected_by, approved_at, rejected_at,
                Createdby, Updatedby, createdbyname, updatedbyname]
        );
        return rows[0];
    } catch (error) {
        throw error;
    }
}


export const getClaim = async () => {
    try {
        const { rows } = await pool.query(
            `
            SELECT * FROM claims;
            `
        );
        return rows;
    } catch (error) {
        throw error;
    }
}


export const getClaimById = async ({ id }) => {
    try {
        const { rows } = await pool.query(
            `
            SELECT * FROM claims WHERE id = $1;
            `,
            [id]
        );
        return rows[0];
    } catch (error) {
        throw error;
    }
}

export const ApproveClaimService = async ({ id, status, approved_amount, approved_by, approved_at }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Get the claim to find user_id and insurance_id
        const { rows: claims } = await client.query(
            `SELECT * FROM claims WHERE id = $1`,
            [id]
        );

        if (claims.length === 0) {
            throw new Error("Claim not found");
        }

        const claim = claims[0];

        // 2. Find the active user_insurance record
        const { rows: userInsurances } = await client.query(
            `SELECT * FROM user_insurance 
             WHERE user_id = $1 AND insurance_id = $2 AND status = 'active' 
             LIMIT 1`,
            [claim.user_id, claim.insurance_id]
        );

        if (userInsurances.length === 0) {
            throw new Error("Active insurance coverage not found for this user");
        }

        const assigningInsurance = userInsurances[0];

        // 3. Update the claim
        const { rows: updatedClaims } = await client.query(
            `
            UPDATE claims 
            SET status = $1, approved_amount = $2, approved_by = $3, approved_at = $4 
            WHERE id = $5 
            RETURNING *;
            `,
            [status, approved_amount, approved_by, approved_at, id]
        );

        // 4. Update the user_insurance balance
        // Assuming claim_amount in user_insurance tracks the REMAINING limit?
        // Or tracks the TOTAL claimed?
        // Original code: "left_claim_amount = assigningInsurance.claim_amount - approved_amount"
        // This implies assigningInsurance.claim_amount is the REMAINING LIMIT.
        const left_claim_amount = Number(assigningInsurance.claim_amount) - Number(approved_amount);

        if (left_claim_amount < 0) {
            throw new Error("Approved amount exceeds remaining insurance limit");
        }

        const { rows: updatedAssigningInsurance } = await client.query(
            `
            UPDATE user_insurance SET claim_amount = $1 WHERE user_insurance_id = $2 RETURNING *;
            `,
            [left_claim_amount, assigningInsurance.user_insurance_id]
        );

        await client.query('COMMIT');
        return { claim: updatedClaims[0], updatedAssigningInsurance: updatedAssigningInsurance[0] };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}