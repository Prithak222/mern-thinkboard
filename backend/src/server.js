import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import ratelimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json()); //this middleware will parse JSON bodies
app.use(ratelimiter)


//example for middleware
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
app.listen(PORT, () => 
{
    console.log("Server started at port", PORT);
})
});




