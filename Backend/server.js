import express from "express";
import cors from "cors";
import apiroutes from "./src/routes/apiroutes.js";

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());


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
