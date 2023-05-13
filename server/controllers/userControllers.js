const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenSchema = require('../models/tokenModel');
const user = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields.');
    };
    const userExist = await user.findOne({ username });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists.');
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
        username,
        email,
        password: hashedPassword,
    });
    res.status(201).send('User created');
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields.');
    }

    const loginUser = await user.findOne({ email });
    if (user && (await bcrypt.compare(password, loginUser.password))) {
        const accessToken = jwt.sign(
            {
                id: loginUser._id,
            },
            process.env.ACESS_TOKEN_SECRET,
            {
                expiresIn: '30D'
            }
        );
        const token = await tokenSchema.create({
            token: accessToken,
            user: loginUser._id,
        });
        res.status(200).json({ accessToken });
    } else {
        res.status(400);
        throw new Error('Invalid credentials.');
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    let token;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        await tokenSchema.findOneAndDelete({ token });
    }
    res.status(200).send('User logged out.');
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        UserID: req.user,
        UserToken: req.token
    });
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
};