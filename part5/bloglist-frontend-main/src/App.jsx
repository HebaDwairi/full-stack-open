import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

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

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
    if(localStorage.getItem('loggedInUser')) {
      setUser(JSON.parse(localStorage.getItem('loggedInUser')));
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  }


  if(user === null) {
    return (<LoginForm handleLogin={handleLogin} 
      username={username} setUsername={setUsername}
      password={password} setPassword={setPassword}/>);
  }

  return (
    <div>
      <h2>blogs</h2>
      <h4>{user.name} logged in</h4>
      <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App;