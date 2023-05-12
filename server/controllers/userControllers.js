const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    console.log(newUser);
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
                id: loginUser._id
            },
            process.env.ACESS_TOKEN_SECRET,
            {
                expiresIn: '30d'
            }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(400);
        throw new Error('Invalid credentials.');
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).send('success');
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};