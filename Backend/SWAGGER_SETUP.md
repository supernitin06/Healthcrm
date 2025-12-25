# Swagger API Documentation Setup Guide

This project uses `swagger-autogen` to automatically generate Swagger/OpenAPI 3.0 documentation from your Express route definitions. This approach avoids the need to write extensive JSDoc comments for every route.

## 1. Installation

The following packages are required (already installed):

```bash
npm install swagger-autogen swagger-ui-express
```

## 2. Configuration Files

### Generator Script: `config/swagger-autogen.js`
This script tells `swagger-autogen` where to look for routes and where to output the JSON file.

```javascript
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Health CRM API',
    description: 'API documentation with Auth & RBAC',
    version: '1.0.0',
  },
  host: 'localhost:5000',
  schemes: ['http'],
  securityDefinitions: {
     bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Enter your bearer token in the format **Bearer &lt;token&gt;**'
     }
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js']; // The entry point to your routes

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);
```

### JSON Output: `config/swagger_output.json`
This file is **auto-generated**. Do not edit it manually. It contains the standard OpenAPI specification generated from your code.

## 3. Server Integration (`server.js`)

In `server.js`, we load the generated JSON and serve it using `swagger-ui-express`.

```javascript
import swaggerUi from "swagger-ui-express";
import fs from "fs";

// Load the auto-generated JSON file
const swaggerOutput = JSON.parse(fs.readFileSync("./config/swagger_output.json", "utf-8"));

const app = express();

// Serve the documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
```

## 4. How to Use

### Step A: Update/Create Routes
Write your Express routes as usual in `src/modules/**/*.route.js`.
You do **not** need to add `@swagger` comments, but `swagger-autogen` will pick up basic details automatically. 

If you want to customize the documentation for a specific route (e.g., adding description or grouping), you can use `#swagger` tags inside your route handlers or before the route definition (though autogen works best by tracing the code).

### Step B: Generate Documentation
Whenever you add a new route or change an existing one, run the following command to update `swagger_output.json`:

```bash
npm run swagger-autogen
```

This will scan your `server.js` and all imported route files.

### Step C: View Documentation
Start your server:

```bash
npm run dev
```

Open your browser to:
**http://localhost:5000/api-docs**

## 5. Troubleshooting
- **Missing Routes**: Ensure your route file is imported in `server.js` (or in a file that `server.js` imports, like `apiroutes.js`). The generator follows the `import`/`require` tree.
- **Outdated Docs**: Remember to run `npm run swagger-autogen` after making changes.
