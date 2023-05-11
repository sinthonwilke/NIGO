const express = require('express');
const connectDB = require('./config/dbConnection');
const errorhandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT;
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use('/', require('./routes/routes'));
app.use('/api/game', require('./routes/gameRoutes.js'));
app.use('/api/tag', require('./routes/tagRoutes.js'));
app.use(errorhandler);
