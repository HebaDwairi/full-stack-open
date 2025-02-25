const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {name: 1, username: 1});
    response.json(blogs);
  }
  catch (err) {
    next(err);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const user = request.user;

    if(!request.token || !user.id) {
      return response.status(401).json({ error: 'invalid token' });
    }

    const newBlog = request.body;
    newBlog.user = user.id;

    const blog = new Blog(newBlog);
    const result =  await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();
    result.user = {
      id: user.id,
      name: user.name,
      username: user.username
    }

    response.status(201).json(result);
  }
  catch (err) {
    next(err);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if(!blog) {
      return response.status(204).end();
    }
    
    if(!request.user.id || ! request.token) {
      return response.status(401).json({ error: 'invalid token' });
    }
    if(request.user.id !== blog.user.toString()) {
      return response.status(401).json({ error: 'invalid user' });
    }

    await Blog.findByIdAndDelete(blog.id);

    response.status(204).end();
  }
  catch (err) {
    next(err);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if(!request.user.id || !request.token) {
      return response.status(401).json({ error: 'invalid token' });
    }
    if(request.user.id !== blog.user.toString()) {
      return response.status(401).json({ error: 'invalid user' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true});
    response.json(updatedBlog);
  }
  catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;


