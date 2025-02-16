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

test('identifier properity for blogs is id not _id', async () => {
    const res = await api.get('/api/blogs');
    const blog = res.body[0];
    
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
});

after(async () => {
    await mongoose.connection.close();
})