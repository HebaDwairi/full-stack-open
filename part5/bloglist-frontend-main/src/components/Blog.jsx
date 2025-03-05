import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({blog ,user, likeBlog, removeBlog}) => {
  const [visible, setVisible] = useState(false);

  return(
    <div className='container'>
      <div>
        <b>{blog.title} {blog.author}</b>
        {visible &&
        <div>
          url: <a href={blog.url}>{blog.url}</a>
          <p>likes: {blog.likes}
            <button className='btn small' onClick={() => {likeBlog(blog)}}>like</button>
          </p>
          <p>user: {blog.user.username}</p>
          {user.username === blog.user.username &&
          <button className='btn small cancel' onClick={() => {removeBlog(blog)}}>remove</button>}
        </div>}
      </div>
      <button className='btn small' onClick={() => {setVisible(!visible)}}>{visible ? 'hide' : 'view'}</button>
    </div>
  );
}

export default Blog