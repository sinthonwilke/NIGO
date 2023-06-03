const express = require('express');
const connectDB = require('./config/dbConnection');
const errorhandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT;
connectDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());

app.use('/', require('./routes/routes'));
app.use('/api/user', require('./routes/userRoutes.js'));
app.use('/api/fav', require('./routes/favRoutes.js'));
app.use('/api/game', require('./routes/gameRoutes.js'));
app.use('/assets/img/:imgName', (req, res) => {
    const imgName = req.params.imgName;
    res.sendFile(imgName, { root: './assets/img' });
});

app.use(errorhandler);
