const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const tokenSchema = require('../models/tokenModel');

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        const IS_TOKEN_EXIST = await tokenSchema.findOne({ token });
        if (!IS_TOKEN_EXIST) {
            res.status(401);
            throw new Error('Not authorized, token failed.');
        }
        jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('Not authorized, token failed.');
            }
            req.user = decoded.id;
            req.token = token;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token.');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no authHead.');
    }
});

module.exports = validateTokenHandler;