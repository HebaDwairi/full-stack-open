const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const app = require('../app');
const { initialBlogs, blogsInDb, initialUsers, usersInDb } = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const api = supertest(app);


beforeEach(async () => {
    await Blog.deleteMany({});
    const blogs = initialBlogs.map(blog => new Blog(blog));
    let promises = blogs.map(blog => blog.save());

    await Promise.all(promises);

    await User.deleteMany({});
    const users = initialUsers.map(user => new User(user));
    promises = users.map(user => user.save());

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

const createToken = (user) => {
    const token = jwt
        .sign({
            username: user.username,
            id: user.id
        }, process.env.SECRET);

    return token;
}

test('when a post request is made the blog is saved to the db', async () => {
    const blogsAtStart = await blogsInDb();
    const usersAtStart = await usersInDb();

    const token = createToken(usersAtStart[0]);

    const newBlog = {
        title: 'test blog',
        author: 'authorname',
        url: 'url',
        likes: 1
    }

    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ authorization: `Bearer ${token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await blogsInDb();

    assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length);
    assert(blogsAtEnd.find(o => o.title === 'test blog' && o.author === 'authorname' && o.url === 'url' && o.likes === 1));
    assert.strictEqual(res.body.user.id, usersAtStart[0].id);
});

test('when likes property is missing it defaults to zero', async () => {
    const newBlog = {
        title: 'test blog',
        author: 'authorname',
        url: 'url',
    }

    const usersAtStart = await usersInDb();
    const token = createToken(usersAtStart[0]);

    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ authorization: `Bearer ${token}` })
        .expect(201);

    assert.strictEqual(res.body.likes, 0);
});

test('when title is missing backend responds with 400', async () => {
    const newBlog = {
        author: 'authorname',
        url: 'url',
        likes: 1
    }

    const usersAtStart = await usersInDb();
    const token = createToken(usersAtStart[0]);

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ authorization: `Bearer ${token}` })
        .expect(400);

    const blogsAtEnd = await blogsInDb();
    assert.strictEqual(initialBlogs.length, blogsAtEnd.length);
});


test('when author is missing backend responds with 400', async () => {
    const newBlog = {
        title: 'blog title',
        url: 'url',
        likes: 1
    }

    const usersAtStart = await usersInDb();
    const token = createToken(usersAtStart[0]);

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ authorization: `Bearer ${token}` })
        .expect(400);

    const blogsAtEnd = await blogsInDb();
    assert.strictEqual(initialBlogs.length, blogsAtEnd.length);
});

test('a blog post can be deleted',  async () => {
    const dbAtStart = await blogsInDb();
    const blog = dbAtStart[0];
    const user = await User.findById(blog.user.toString());
    const token = createToken(user);

    await api
        .delete(`/api/blogs/${blog.id}`)
        .set({ authorization: `Bearer ${token}` })
        .expect(204);

    const dbAtEnd = await blogsInDb();
    
    assert.strictEqual(dbAtStart.length, dbAtEnd.length + 1);
    assert(!dbAtEnd.find(o => o.title === blog.title && o.author === blog.author && o.url === blog.url && o.likes === blog.likes));
});

test('a blog post number of likes can be updated correctly',  async () => {
    const dbAtStart = await blogsInDb();
    const blog = dbAtStart[0];
    const user = await User.findById(blog.user.toString());
    const token = createToken(user);
    
    blog.likes = 12;

    const res = await api
        .put(`/api/blogs/${blog.id}`)
        .send(blog)
        .set({ authorization: `Bearer ${token}` })
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const dbAtEnd = await blogsInDb();
    
    assert.strictEqual(dbAtStart.length, dbAtEnd.length);
    assert.strictEqual(blog.likes, res.body.likes);
});

after(async () => {
    await mongoose.connection.close();
});

test('adding a blog without authorization token fails with status 401', async () => {
    const blogsAtStart = await blogsInDb();

    const newBlog = {
        title: 'test blog',
        author: 'authorname',
        url: 'url',
        likes: 1
    }

    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/);
    
    const blogsAtEnd = await blogsInDb();

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);
    assert(!blogsAtEnd.find(o => o.title === 'test blog' && o.author === 'authorname' && o.url === 'url' && o.likes === 1));
    assert.strictEqual(res.body.error, 'invalid token');
});