const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const app = require('../app');
const { initialUsers, usersInDb } = require('./test_helper');
const User = require('../models/user')

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    const users = initialUsers.map(user => new User(user));
    const promises = users.map(user => user.save());

    await Promise.all(promises);
});

test('user with valid info is created', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
        name: "name",
        username: "username",
        password: "12abc34"
    }

    const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);
    assert.strictEqual(res.body.username, newUser.username);
});

test('user with invalid password is not created', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
        name: "name",
        username: "username",
        password: "12"
    }

    const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    assert.strictEqual(usersAtStart.length , usersAtEnd.length);
    assert.strictEqual(res.body.error, "password is required and should be >= 3 charactars long");
});

test('user with non unique username is not created', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
        name: "name",
        username: "abc",
        password: "12abc34"
    }

    const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    assert.strictEqual(usersAtStart.length , usersAtEnd.length);
    assert.strictEqual(res.body.error, "expected `username` to be unique");
});

after(async () => {
    await mongoose.connection.close();
});
