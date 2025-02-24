import { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  return(
    <div style={styles}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => {setVisible(!visible)}}>{visible ? 'hide' : 'view'}</button>
      {visible && 
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>likes: {blog.likes}
          <button>like</button>
        </p>
        <p>{blog.user.username}</p>
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