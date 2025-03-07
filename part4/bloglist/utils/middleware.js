const logger = require('../utils/logger')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path:   ', request.path);
    logger.info('Body:   ', request.body);
    logger.info('-----');
    next();
}

const unknownEndpoint = (request, response) => {
    return response.status(404).json({error: 'unknown endpoint'});
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if(authorization && authorization.startsWith('Bearer ')) {
        request.token =  authorization.replace('Bearer ', '');
    }
    else {
        request.token = null;
    }
    next();
}

const userExtractor = async (request, response, next) => {
    try {
        if (!request.token) {
            request.user = null;
            return next();
        }
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        const user = await User.findById(decodedToken.id);
        request.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if(error.name === 'CastError') {
        return response.status(400).json({error: 'malformatted id'});
    }
    else if(error.name === 'ValidationError') {
        return response.status(400).json({error: error.message});
    }
    else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token'});
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'expired token'});
    }

    next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}