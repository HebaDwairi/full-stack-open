import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = {display: visible ? '' : 'none'};
  const hideWhenVisible = {display: visible ? 'none' : ''};

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(refs, () => {   
    return {  
      toggleVisibility
    }  
  });

  return(
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.value}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <button style={showWhenVisible} onClick={toggleVisibility}>cancel</button>
    </div>
  );
});

const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => {
  return(
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username: 
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          password: 
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
}

const NewBlogForm = ({handleNewBlog, blog, setBlog}) => {
  return(
    <div>
      <h3>Create New</h3>
      <form onSubmit={handleNewBlog}>
        <div>
          title: 
          <input type="text" value={blog.title} onChange={(e) => setBlog({...blog, title: e.target.value})}/>
        </div>
        <div>
          author: 
          <input type="text" value={blog.author} onChange={(e) => setBlog({...blog, author: e.target.value})}/>
        </div>
        <div>
          url: 
          <input type="text" value={blog.url} onChange={(e) => setBlog({...blog, url: e.target.value})}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
}

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  });
  const blogFromRef = useRef(null);

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

  const handleNewBlog = (e) => {
    e.preventDefault();
    blogService
      .create(blog)
      .then(res => {
        setBlogs(blogs.concat(res));
        blogFromRef.current.toggleVisibility();
        setBlog({
          title: '',
          author: '',
          url: ''
        });
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

  if(user === null) {
    return (
      <div>
        {message &&
          <div style={{border:'1px solid black'}}>
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
      <h2>blogs</h2>
      {message && 
        <div style={{border:'1px solid black'}}>
          {message}
        </div>
      }
      <h4>{user.name} logged in</h4>
      <button onClick={handleLogout}>logout</button>
      <Togglable value={'create new blog'} ref={blogFromRef}>
        <NewBlogForm handleNewBlog={handleNewBlog} blog={blog} setBlog={setBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App;