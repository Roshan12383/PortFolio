import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import connectDb from "./config/connectDb.js";
import userrouter from "./routes/userRoute.js";
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors({
    origin: "https://portfolio-2-w8vy.onrender.com",
    credentials: true
}));

app.use("/api", userrouter);
app.listen(port, () => {
    console.log(`Server is Running ${port}`);
    connectDb();
})
