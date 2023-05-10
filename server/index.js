const express = require('express');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT;
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/', require('./routes/routes'));