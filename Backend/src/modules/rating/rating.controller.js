import { addRatingService, getRatingsService } from "./rating.service.js";

export const AddDoctorRatingController = async (req, res) => {
    try {
        const { rating, review_msg } = req.body;
        const data = { rating, review_msg };
        const result = await addRatingService("doctor", req.params.id, req.user.id, data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetDoctorRatingsController = async (req, res) => {
    try {
        const ratings = await getRatingsService("doctor", req.params.id);
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const AddHealthTestRatingController = async (req, res) => {
    try {
        const { rating, review_msg } = req.body;
        const data = { rating, review_msg };
        const result = await addRatingService("health_test", req.params.id, req.user.id, data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetHealthTestRatingsController = async (req, res) => {
    try {
        const ratings = await getRatingsService("health_test", req.params.id);
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const AddStaffRatingController = async (req, res) => {
    try {
        const { rating, review_msg } = req.body;
        const data = { rating, review_msg };
        const result = await addRatingService("staff", req.params.id, req.user.id, data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetStaffRatingsController = async (req, res) => {
    try {
        const ratings = await getRatingsService("staff", req.params.id);
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const AddInsuranceRatingController = async (req, res) => {
    try {
        const { rating, review_msg } = req.body;
        const data = { rating, review_msg };
        const result = await addRatingService("insurance", req.params.id, req.user.id, data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetInsuranceRatingsController = async (req, res) => {
    try {
        const ratings = await getRatingsService("insurance", req.params.id);
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
