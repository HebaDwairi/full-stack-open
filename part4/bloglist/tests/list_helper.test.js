const {test, describe} = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
});

describe('total likes ', () => {
    test('of empty list is zero', () => {
        const blogs = [];
        
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 0);
    });

    test('when list has one blog equals the likes of that', () => {
        const blogs = [{
            title: 'blogname',
            author: 'someone',
            url: 'url',
            likes: 32
        }];
        
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 32);
    });

    test('of a bigger list is calculated right', () => {
        const blogs = listHelper.initialBlogs;
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 36);
    });
});


describe('favorite blog', () => {
    test('when list is empty is empty object', () => {
        blogs = [];
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, {});
    });

    test('when list is one blog is that blog', () => {
        blogs = [{
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }];
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2
        });
    });

    test('of a bigger list is calculated right', () => {
        const blogs = listHelper.initialBlogs;
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        });
    });
    
});


describe('author with most blogs', () => {
  test('when list is empty is empty object', () => {
      blogs = [];
      const result = listHelper.mostblogs(blogs);
      assert.deepStrictEqual(result, {});
  });

  test('when list is one blog is the author of that blog', () => {
      blogs = [{
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
      }];
      const result = listHelper.mostblogs(blogs);
      assert.deepStrictEqual(result, {
          author: "Robert C. Martin",
          blogs: 1
      });
  });

  test('of a bigger list is calculated right', () => {
      const blogs = listHelper.initialBlogs;
      const result = listHelper.mostblogs(blogs);
      assert.deepStrictEqual(result, {
          author: "Robert C. Martin",
          blogs: 3
      });
  });
  
});


describe('author whose blogs have most likes', () => {
  test('when list is empty is empty object', () => {
      blogs = [];
      const result = listHelper.mostLikes(blogs);
      assert.deepStrictEqual(result, {});
  });

  test('when list is one blog is the author of that blog', () => {
      blogs = [{
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
      }];
      const result = listHelper.mostLikes(blogs);
      assert.deepStrictEqual(result, {
          author: "Robert C. Martin",
          likes: 2
      });
  });

  test('of a bigger list is calculated right', () => {
      const blogs = listHelper.initialBlogs;
      const result = listHelper.mostLikes(blogs);
      assert.deepStrictEqual(result, {
          author: "Edsger W. Dijkstra",
          likes: 17
      });
  });
  
});