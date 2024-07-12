const mongoose = require('mongoose') // Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a schema-based solution to model your application data.
const colors = require('colors') // Colors is a library to add color and styles to your console output in Node.js.

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database - '${mongoose.connection.host}'`.bgCyan.white);
    } catch (error) {
        console.log(`error in db is ${error}`.bgRed.white);
    }
}

module.exports = connectDB