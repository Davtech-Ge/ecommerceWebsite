const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
    } catch (err) {
       console.log(err) 
    }
}

module.exports = connectDB;