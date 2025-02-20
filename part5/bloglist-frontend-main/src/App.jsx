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
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    loginService
      .login({ username, password })
      .then(res => {
        setUser(res);
        setPassword('');
        setUsername('');
      
      })
      .catch(err => {
        console.log(err);
      });
  }


  if(user === null) {
    return (<LoginForm handleLogin={handleLogin} 
      username={username} setUsername={setUsername}
      password={password} setPassword={setPassword}/>);
  }

  return (
    <div>
      <h2>{user.name} logged in</h2>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App;