/**
 * GENERIC NODEJS API
 * --------------------------------------
 * 
 * modules: express, mysql, cors, dotenv, nodemon, sha1
 * 
 * REST API endpoints:
 * -------------------------
 * CRUD operation for a generic database table:
 * 
 * READ Operations:
 * -------------------------
 * GET /api/:table - Get all records from the specified table
 * GET /api/:table/:id - Get a specific record by ID from the specified table
 * 
 * CREATE operations:
 * -------------------------
 * POST /api/:table - Create a new record in the specified table
 * 
 * UPDATE operations:
 * -------------------------
 * PATCH /api/:table/:id - Update a specific record by ID in the specified table
 * 
 * DELETE operations:
 * -------------------------
 * DELETE /api/:table - Delete all records from the specified table
 * DELETE /api/:table/:id - Delete a specific record by ID from the specified table
 * 
 * EMAIL Operations:
 * -------------------------
 * POST /api/email - Send an email using the specified parameters
 * 
 * FILE Operations:
 * -------------------------
 * POST /api/upload - Upload a file to thew server
 * GET /api/download/:filename
 * 
 * Middleware:
 * -------------------------
 * CORS - Enable Cross-Origin Resource Sharing for all routes
 * Express JSON Parser - Parse incoming request bodies in JSON format.
 * Express URL extended Parser - Parse incoming request bodies with URL-encoded payloads.
 * Token Authentication
 * 
 * -------------------------
 */


require('dotenv').config();
const express = require('express');
const cors = require('cors');

const tableRoutes = require('./modules/tables_ops');
const emailRoutes = require('./modules/email_ops');
const fileRoutes = require('./modules/file_ops');
const authRoutes = require('./modules/auth_ops');

const app = express();

//Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) =>{
    res.send('Welcome to the Generic NodeJS API');
});


app.use('/', tableRoutes);
app.use('/email', emailRoutes);
app.use('/file', fileRoutes);
app.use('/auth', authRoutes);


app.listen(process.env.APP_PORT, () =>{
    console.log(`Server is running on port http://localhost:${process.env.APP_PORT}`)
});

