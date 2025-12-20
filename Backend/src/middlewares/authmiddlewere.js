import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token && req.cookies) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ error: "Unauthorized user h" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized user" });
    }
};