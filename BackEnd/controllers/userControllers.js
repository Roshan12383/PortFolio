import sendMail from "../config/sendEmail.js";
import User from "../model/userModel.js";

export const submitMessage = async(req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 1. Save to Database
        await User.create({
            name,
            email,
            message
        });

        // 2. Send Email
        await sendMail({ name, email, message });

        return res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Backend Error in submitMessage:", error);
        return res.status(500).json({
            message: error.message || "Something went wrong"
        });
    }
};