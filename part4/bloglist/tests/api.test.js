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

test('when title is missing backend responds with 400', async () => {
    const newBlog = {
        author: 'authorname',
        url: 'url',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});


test('when author is missing backend responds with 400', async () => {
    const newBlog = {
        title: 'blog title',
        url: 'url',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

test('a blog post can be deleted',  async () => {
    const dbAtStart = await blogsInDb();
    const blog = dbAtStart[0];

    await api
        .delete(`/api/blogs/${blog.id}`)
        .expect(204);

    const dbAtEnd = await blogsInDb();
    
    assert(dbAtStart.length === dbAtEnd.length + 1);
    assert(!dbAtEnd.find(o => o.title === blog.title && o.author === blog.author && o.url === blog.url && o.likes === blog.likes));
});

test('a blog post number of likes can be updated correctly',  async () => {
    const dbAtStart = await blogsInDb();
    let blog = dbAtStart[0];
    blog.likes = 12;

    const res = await api
        .put(`/api/blogs/${blog.id}`)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const dbAtEnd = await blogsInDb();
    
    assert(dbAtStart.length === dbAtEnd.length);
    assert(blog.likes === res.body.likes);
});

after(async () => {
    await mongoose.connection.close();
});