import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blogs, setBlogs, index , user }) => {
  const [visible, setVisible] = useState(false);
  const blog = blogs[index];

  const obj = {
    user: blog.user.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
  }

  const likeBlog = () => {
    blogService
      .update(obj, blog.id)
      .then(updatedBlog => {
        const tmp = [...blogs];
        tmp[index] = updatedBlog;
        setBlogs(tmp);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  const removeBlog = () => {
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

  return(
    <div className='container'>
      <div>
        <b>{blog.title} {blog.author}</b>
        {visible &&
        <div>
          url: <a href={blog.url}>{blog.url}</a>
          <p>likes: {blog.likes}
            <button className='btn small' onClick={likeBlog}>like</button>
          </p>
          <p>user: {blog.user.username}</p>
          {user.username === blog.user.username &&
          <button className='btn small cancel' onClick={removeBlog}>remove</button>}
        </div>}
      </div>
      <button className='btn small' onClick={() => {setVisible(!visible)}}>{visible ? 'hide' : 'view'}</button>
    </div>
  );
}

export default Blog