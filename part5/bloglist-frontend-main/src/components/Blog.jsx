import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blogs, setBlogs, index }) => {
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
    <div style={styles}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => {setVisible(!visible)}}>{visible ? 'hide' : 'view'}</button>
      {visible && 
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>likes: {blog.likes}
          <button onClick={likeBlog}>like</button>
        </p>
        <p>{blog.user.username}</p>
        <button onClick={removeBlog}>remove</button>
      </div>}
    </div>
  );  
}

const styles = {
  border: "1px solid black",
  margin: 3,
  padding: 3
}

export default Blog