import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    },
})

// console.log(process.env.USER_EMAIL);
// console.log(process.env.USER_PASSWORD);


const sendMail = async({ name, email, message }) => {
    await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: process.env.USER_EMAIL,
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        text: `Name ${name}\nEmail: ${email}\nMessage: ${message}`
    })
}


export default sendMail;