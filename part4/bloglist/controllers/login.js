const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

loginRouter.post('/', async (request, response, next) => {
    try {
        const { username, password } = request.body;

        const user = await User.findOne({ username });
        const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

        if(!(user && passwordCorrect)) {
            return response
                .status(401)
                .json({ error: 'invalid username or password' });
        }

        const objForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(objForToken, process.env.SECRET, { expiresIn: 60*60 });

        response
            .status(200)
            .send({token: token, name: user.name, username: user.username});
    }
    catch (err) {
        next(err);
    }
});

module.exports = loginRouter;