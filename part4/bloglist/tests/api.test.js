const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const app = require('../app');
const { initialBlogs, blogsInDb } = require('./test_helper');
const Blog = require('../models/blog')

const api = supertest(app);


beforeEach(async () => {
    await Blog.deleteMany({});
    const blogs = initialBlogs.map(blog => new Blog(blog));
    const promises = blogs.map(blog => blog.save());

    await Promise.all(promises);
});

test('correct number of blogs is returned in json', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    assert(res.body.length === initialBlogs.length);
});

after(async () => {
    await mongoose.connection.close();
})