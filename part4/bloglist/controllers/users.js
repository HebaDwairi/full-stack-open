const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
    try {
        const { name, username, password } = request.body;

        if(!(password && password.length >= 3)) {
            return response
                .status(400)
                .json({error: 'password is required and should be >= 3 charactars long'});
        }

        const passwordHash = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            username,
            passwordHash,
        });

        const savedUser = await newUser.save();
        response.status(201).json(savedUser);
    }
    catch (err) {
        next(err);
    }
});

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', {title: 1, url: 1, author: 1});
        response.json(users);
    }
    catch (err) {
        next(err);
    }
});

module.exports = usersRouter;