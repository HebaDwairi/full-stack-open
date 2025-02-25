import { useState } from 'react';

const NewBlogForm = ({ handleNewBlog }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  });

  const addBlog = (e) => {
    e.preventDefault();
    handleNewBlog(blog);
    setBlog({
      title: '',
      author: '',
      url: ''
    });
  }
  return(
    <div>
      <h3>Create New</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input type="text" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })}/>
        </div>
        <div>
          author:
          <input type="text" value={blog.author} onChange={(e) => setBlog({ ...blog, author: e.target.value })}/>
        </div>
        <div>
          url:
          <input type="text" value={blog.url} onChange={(e) => setBlog({ ...blog, url: e.target.value })}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
}

export default NewBlogForm;