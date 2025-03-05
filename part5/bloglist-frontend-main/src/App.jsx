import { useState, useEffect, useRef } from 'react';
import './app.css';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogFrom';
import blogService from './services/blogs';
import loginService from './services/login';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const blogFormRef = useRef(null);

  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
    if(localStorage.getItem('loggedInUser')) {
      const userObj = JSON.parse(localStorage.getItem('loggedInUser'));
      setUser(userObj);
      blogService.setToken(userObj.token);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    loginService
      .login({ username, password })
      .then(res => {
        setUser(res);
        setPassword('');
        setUsername('');
        localStorage.setItem('loggedInUser', JSON.stringify(res));
        blogService.setToken(res.token);
      })
      .catch((err) => {
        setMessage(`login failed: ${err.response.data.error}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  }

  const handleNewBlog = (blog) => {
    blogService
      .create(blog)
      .then(res => {
        setBlogs(blogs.concat(res));
        blogFormRef.current.toggleVisibility();
        setMessage(`a new blog ${res.title} by ${res.author} added`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((err) => {
        setMessage(`adding blog failed: ${err.response.data.error}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  }

  const likeBlog = (blog) => {
    const obj = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }

    blogService
      .update(obj, blog.id)
      .then(updatedBlog => {
        setBlogs((prev) => (prev.map(b => b.id === blog.id ? updatedBlog : b))
        );
      })
      .catch(err => {
        console.log(err.message);
        console.log(obj, blog)
      });
  }

  const removeBlog = (blog) => {
    if(confirm(`do you want to delete blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteBlog(blog.id)
        .then(res => {
          setBlogs(blogs.filter(b => b.id !== blog.id));
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }

  if(user === null) {
    return (
      <div>
        {message &&
          <div style={{ border:'1px solid black' }}>
            {message}
          </div>
        }
        <LoginForm handleLogin={handleLogin}
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}/>
      </div>
    );
  }

  return (
    <div>
      <div className='header'>
        <h2 className='name'>blogs</h2>
        {message &&
          <div style={{ border:'1px solid black' }}>
            {message}
          </div>
        }
        <h4>{user.name} logged in</h4>
        <button onClick={handleLogout} className='btn'>logout</button>
      </div>
      <div className='blogs'>
        <Togglable value={'create new blog'} ref={blogFormRef}>
          <NewBlogForm handleNewBlog={handleNewBlog}/>
        </Togglable>
        {sortedBlogs.map((blog) =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user}/>
        )}
      </div>
    </div>
  );
}

export default App;