const express = require('express');
const mysql = require("mysql2");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});
