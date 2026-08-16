import sendMail from "../config/sendEmail.js";
import User from "../model/userModel.js";

export const submitMessage = async(req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            res.status(400).json({ message: "All Field are required" });
        }

        const newMessage = await User.create({
            name,
            email,
            message
        })

        await sendMail({ name, email, message });

        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}