const logger = require('./utils/logger');
const config = require('./utils/config');
const app = require('./app');

app.listen(config.PORT, () => {
    logger.info(`server running on port ${config.PORT}`);
});






/*

//require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//const blogSchema = new mongoose.Schema({
  //title: String,
  //author: String,
  //url: String,
  //likes: Number
//})

//const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

/*
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})*/

//const PORT = process.env.PORT;
//app.listen(PORT, () => {
 // console.log(`Server running on port ${PORT}`)
//})*/