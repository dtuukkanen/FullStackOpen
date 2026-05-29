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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
