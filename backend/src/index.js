import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import {app,server} from "./lib/socket.js";
import path from "path"
import cors from "cors";


dotenv.config()
const port=process.env.PORT;
const __dirname=path.resolve();

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(cors({
     origin:"http://localhost:5173",
     credentials:true,
}));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    connectDB();
})
