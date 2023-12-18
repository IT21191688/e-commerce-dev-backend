"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const InternalServerError_1 = __importDefault(require("../error/error.classes/InternalServerError"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
// Mail server configurations
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    // host: 'smtp.gmail.com',
    // port: 465,
    secure: true,
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_PASSWORD,
    },
});
const sendEmail = async (email, subject, htmlBody, attachment) => {
    if (!email)
        throw new NotFoundError_1.default("Email is required!");
    if (!subject)
        throw new NotFoundError_1.default("Subject is required!");
    if (!htmlBody)
        throw new NotFoundError_1.default("HTML body is required!");
    const mailOptions = {
        from: process.env.SERVER_EMAIL,
        to: email,
        subject: subject,
        html: htmlBody,
    };
    if (attachment) {
        mailOptions.attachments = [
            {
                filename: attachment.originalname,
                content: attachment.buffer,
                contentType: attachment.mimetype,
            },
        ];
    }
    try {
        const result = await transporter.sendMail(mailOptions);
        //console.log("Email sent successfully:", result);
        return result;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new InternalServerError_1.default("Failed to send email");
    }
};
exports.sendEmail = sendEmail;
