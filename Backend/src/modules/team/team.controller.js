import {
    createTeamService,
    getTeamsService,
    getTeamByIdService,
    updateTeamService,
    deleteTeamService,
} from "./team.service.js";

export const createTeamController = async (req, res) => {
    try {
        const { name } = req.body;
        const team = await createTeamService(name);
        res.status(201).json({ message: "Team created successfully", team });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: "Team already exists" });
        }
        console.error("Error creating team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getTeamsController = async (req, res) => {
    try {
        const teams = await getTeamsService();
        res.status(200).json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getTeamByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await getTeamByIdService(id);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.status(200).json(team);
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateTeamController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const team = await updateTeamService(id, name);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.status(200).json({ message: "Team updated successfully", team });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: "Team name already exists" });
        }
        console.error("Error updating team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteTeamController = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await deleteTeamService(id);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
