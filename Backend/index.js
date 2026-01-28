import http from "http";
import dotenv from "dotenv";
import app from "./server.js";
import { initDB } from "./db/initDB.js";
// Load environment variables from .env file
import os from "os";

const totalCores = os.cpus().length;
console.log(`Total CPU Cores: ${totalCores}`);


dotenv.config();
initDB();


// Create the HTTP server using the Express app
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});