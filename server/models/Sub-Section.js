// instance of mongoose
const mongoose = require("mongoose");

//sub section schema
const subSectionSchema = new mongoose.Schema({
    title:{
        type:String, 
    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String
    },
    videoURL:{
        type:String
    }
});
 
module.exports = mongoose.model("Sub-Section",subSectionSchema);