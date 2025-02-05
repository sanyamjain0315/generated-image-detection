import express from 'express';
import { connectDB } from './db/connectDB.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const PORT =  process.env.PORT || 5000;
const __dirname=path.resolve();
const __filename = fileURLToPath(import.meta.url);

app.use(express.json()) // Allow us to parse the incoming Requests with Json payloads req.body
app.use(cookieParser()); //Allows us to parse the incoming cookies
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use("/api/auth",authRoutes)

const frontendPath = path.join(__dirname, "./frontend/UI/dist");
if(process.env.NODE_ENV==="production"){
  
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

app.listen(PORT,()=>{
    connectDB();
    console.log("Server is running on port",PORT);

})

