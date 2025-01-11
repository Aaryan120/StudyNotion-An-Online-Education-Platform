//instance of mongoose
const mongoose = require("mongoose");

//request dot env to access the database url in the env file
require("dotenv").config();

//function to connect to db
exports.dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{}).
    then(()=>{console.log("Database Connected Successfully");}).
    catch((error) =>{
        console.log(error);
        console.log("Database Connection Failed");
        process.exit(1);
    });
};


