//instance of mongoose
const mongoose = require("mongoose");
 
//profile model schema
const profileSchema = new mongoose.Schema({
    gender:{
        type: String,
    },
    dateOfBirth:{
        type:Date,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true,
    }
});

module.exports = mongoose.model("Profile",profileSchema);