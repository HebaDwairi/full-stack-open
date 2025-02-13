const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return blog.likes + sum;
    }

    return blogs.reduce(reducer, 0);
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return {};

    const reducer = (maxBlog, blog) => {
        if(maxBlog.likes > blog.likes){
            return {
                title: maxBlog.title,
                author: maxBlog.author,
                likes: maxBlog.likes
            };
        }
        else{
            return {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            };
        }
    }

    return blogs.reduce(reducer, 0);
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}