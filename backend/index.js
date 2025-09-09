const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const routes = require('./route/index');
const path =require('path');
dotenv.config()

const app = express();
app.use(cors({
    origin: ['*', 'https://primelendinghub.in'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api',routes);
app.get("/", (req, res) => {
  res.send("Server is running...");
});
const PORT = process.env.PORT || 8000
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running on port :",PORT)
    })
})




