require("dotenv").config()
const express = require("express");
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "50mb" }));

// const connectDB = require("./db/connect")
const mongoose = require("mongoose")

// routers
try {
    const appRoutes = require("./routes/index")
    appRoutes(app)
} catch (error) {
    console.log("Route Crash -> ", error)
}

const start = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            // useNewUrlParser:true,
            // useUnifiedTopology:true, 
        })
        // await connectDB(process.env.MONGO_URL)
        // await startd();
        // await 
        app.listen(PORT, () => {
            console.log("server is listening", PORT)
        })
    } catch (error) {
        console.log(error)
    }
}
start()



