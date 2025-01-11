//instance of mongoose
const mongoose = require("mongoose");

//section schema
const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
        required:true
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Sub-Section",
        }
    ]
});

module.exports = mongoose.model("Section",sectionSchema);