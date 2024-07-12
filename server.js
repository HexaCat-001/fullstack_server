const express = require('express') // Express is a fast, unopinionated, minimalist web framework for Node.js. It is commonly used to build web applications and APIs.
const cors = require('cors') //  CORS (Cross-Origin Resource Sharing) is a mechanism to allow or restrict requested resources on a web server depending on where the HTTP request was initiated.
const dotenv = require('dotenv') // Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
const morgan = require('morgan') // Morgan is an HTTP request logger middleware for Node.js. It simplifies logging requests in your application.
const connectDB = require('./config/db')



// * DOTENV
dotenv.config()

// * mongodb connection
connectDB()

// * REST Object
const app = express()

// * Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// * Routers
app.use('/api/v1/auth', require('./routes/userRoutes'))
app.use('/api/v1/post',require('./routes/postRoutes'))
// home
app.get("/",(req,res)=>{
  res.status(200).send({
    "success":true,
    "msg":"Node Server Running",
  })
})


// * PORT
const PORT = process.env.PORT || 8080

// * listen
app.listen(PORT,()=>{console.log(`Server running ${PORT}`.bgGreen.white)})
