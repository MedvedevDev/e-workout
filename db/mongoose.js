const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

mongoose
  .connect(process.env.DBURL)
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error('Database connection error:', err));