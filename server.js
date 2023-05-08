const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const router = require('./routes/routes');

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', router);