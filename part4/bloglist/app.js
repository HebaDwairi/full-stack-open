const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');


mongoose.set('strictQuery', false);

const url = config.MONGODB_URI;
logger.info('connecting to mongodb');

mongoose.connect(url).then(() => {
    console.log('connected successfully');
}).catch(err => {
    console.log('connection failed ', err.message);
});


app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if(process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;
