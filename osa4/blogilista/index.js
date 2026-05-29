const express = require('express');
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')

const app = express();

mongoose.connect(config.MONGODB_URI, { family: 4 });

app.use(express.json());

app.use('/api/blogs', blogRouter)


const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
