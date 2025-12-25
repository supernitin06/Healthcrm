import express from "express";
import cors from "cors";
import apiroutes from "./src/routes/apiroutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
const swaggerOutput = JSON.parse(fs.readFileSync("./config/swagger_output.json", "utf-8"));

const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerOutput)
);

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cookieParser());
dotenv.config();
/**
 * #swagger.tags = ['Health']
 * #swagger.summary = 'Health check'
 */
app.use('/api', apiroutes);

// Middleware to enable Cross-Origin Resource Sharing (CORS) for all origins
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// A simple GET route that sends back "Hello World"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
