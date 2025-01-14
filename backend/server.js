import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoute.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/userRoute.js"
import friendRequestRoutes from "./routes/friendrequest.route.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


const PORT= process.env.PORT||5000;

const __dirname=path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)
app.use('/api/friend-requests', friendRequestRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});