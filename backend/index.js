import express from 'express';
import { connectDB } from './db/connectDB.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
const PORT =  process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.use(express.json()) // Allow us to parse the incoming Requests with Json payloads req.body
app.use(cookieParser()); //Allows us to parse the incoming cookies
app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    connectDB();
    console.log("Server is running");

})

