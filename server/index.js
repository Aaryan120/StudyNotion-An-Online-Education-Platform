// Import express and Create an instance of Express
const express = require("express");
const app = express();


// Import all the routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactusRoutes = require("./routes/Contact")

const dataBase = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config()

const PORT = process.env.PORT || 4000;

// database connect
dataBase.dbConnect();

// Middleware 
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// Cloudinary connection
cloudinaryConnect();

// Routes (mounted)
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach",contactusRoutes);

// def route
app.get("/", (req,res) =>{
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})


app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`);
})