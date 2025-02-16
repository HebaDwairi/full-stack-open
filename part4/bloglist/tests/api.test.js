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

test('when a post request is made the blog is saved to the db', async () => {
    const dbAtStart = await blogsInDb();

    const newBlog = {
        title: 'test blog',
        author: 'authorname',
        url: 'url',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const dbAtEnd = await blogsInDb();

    assert(dbAtStart.length + 1 === dbAtEnd.length);
    assert(dbAtEnd.find(o => o.title === 'test blog' && o.author === 'authorname' && o.url === 'url' && o.likes === 1));
});

test('when likes property is missing it defaults to zero', async () => {
    const newBlog = {
        title: 'test blog',
        author: 'authorname',
        url: 'url',
    }

    const res = await api.post('/api/blogs').send(newBlog);
    assert(res.body.likes === 0);
});

after(async () => {
    await mongoose.connection.close();
});