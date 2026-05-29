const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) => 
    favorite.likes < blog.likes ? blog : favorite
  )
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  return Object.entries(authors).reduce(
    (max, [author, count]) =>
      count > max.blogs
        ? { author, blogs: count }
        : max,
    { author: '', blogs: 0 }
  )
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {});

  return Object.entries(authors).reduce(
    (max, [author, count]) =>
      count > max.likes
        ? { author, likes: count }
        : max,
    { author: '', likes: 0 },
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
