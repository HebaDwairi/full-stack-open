const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');


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
    const user = await User.findOne({});

    const newBlog = request.body;
    newBlog.user = user.id;

    const blog = new Blog(newBlog);
    const result =  await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  }
  catch (err) {
    next(err);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
  catch (err) {
    next(err);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = request.body;
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
    response.json(updatedBlog);
  }
  catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;


