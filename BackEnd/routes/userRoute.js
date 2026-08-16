import express from "express"
import { submitMessage } from "../controllers/userControllers.js";
const userrouter = express.Router();

userrouter.post("/contact", submitMessage);


export default userrouter;