const mongoose = require('mongoose');



const connectDB = async () => {

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);

};


// const connectDB = async () => {
//     try {
//       const conn = await mongoose.connect(process.env.MONGO_URI);
//       console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
//     } catch (err) {
//       console.error(`Error connecting to MongoDB: ${err.message}`.red.bold);
//       process.exit(1); // exit process with failure
//     }
//   };
  
  module.exports = connectDB;
  


