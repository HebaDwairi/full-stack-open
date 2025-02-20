const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: "5a422ba71b54a676234d17fb",
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      user: "5a422ba71b54a676234d17fb",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      user: "5a422ba71b54a676234d17fb",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      user: "5a422ba71b54a676234d17fb",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      user: "5a422ba71b54a676234d17fb",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      user: "5a422ba71b54a676234d17fb",
      likes: 2,
      __v: 0
    }  
  ];

const initialUsers = [
  {
    _id: "5a422bc61b54a676234d17fc", 
    name: "abc",
    username: "abc",
    passwordHash: "$2y$10$sjbDkRcUb0FCC/FgYovOve0DZVaOCYWB4A2F4iV4nvePMWLP2ZeF.",
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    name: "def",
    username: "def",
    passwordHash: "$2a$10$II3PMmb.AtnfFXbgJyFLseNBGSMO/YYgUAQsFCCXDHdf5mOHd1Oa2",
    __v: 0
  }
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
}

module.exports = {
    initialBlogs,
    blogsInDb,
    initialUsers,
    usersInDb,
}