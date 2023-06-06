const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSchema = require('../models/tokenModel');
const user = require('../models/userModel');
const fs = require('fs');


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields.');
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
        username,
        email,
        password: hashedPassword,
    });
    res.status(201).send('created');
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields.');
    }

    const loginUser = await user.findOne({ email });
    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
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
        throw new Error('Invalid Email or Password.');
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        let token = authHeader.split(' ')[1];
        await tokenSchema.findOneAndDelete({ token });
        res.status(200).send('User logged out.');
    } else {
        res.status(401).send('Invalid token.');
    }
});

const currentUser = asyncHandler(async (req, res) => {
    const currentUser = await user.findById(req.user).select({ bio: 1, profilePicture: 1, username: 1 });
    res.status(200).json(currentUser);
});

const updateUser = asyncHandler(async (req, res) => {
    const { username, bio } = req.body;
    const updatedFields = {
        username: username,
        bio: bio,
    };
    const usernameExist = await user.findOne({ username });

    if (usernameExist) {
        res.status(400).send('Username already exists.');
    } else {
        if (req.file) {
            const oldProfilePicture = await user.findById(req.user);
            console.log(oldProfilePicture.profilePicture);
            if (oldProfilePicture.profilePicture !== 'assets/userImg/default.jpg') {
                deleteImg(oldProfilePicture.profilePicture);
            }
            updatedFields.profilePicture = req.file.path;
        }
        await user.findByIdAndUpdate(req.user, updatedFields);
        res.status(200).send('User updated.');
    }
});

function deleteImg(url) {
    if (url === '') return;
    fs.unlink(url, (err) => {
        if (err) {
            console.log(err);
        }
    });
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    updateUser
};