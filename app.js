
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const {mongoUrl} = require("./config/config");
const cors = require("cors");
const path = require("path")

const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const corsOption ={ credentials: true, origin: true};

app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({extended: true, limit:"100mb"}));
app.use(cookieParser());
app.use(cors(corsOption));

app.use("/api", userRoutes);
app.use("/api", projectRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static('frontend/build'));
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

const ConnectDB = async()=>{
    try {
        await mongoose.connect(mongoUrl, { useUnifiedTopology: true });
        console.log("Server Connected to database");

        app.listen(port, ()=>{
            console.log(`server started at port: ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

ConnectDB();



