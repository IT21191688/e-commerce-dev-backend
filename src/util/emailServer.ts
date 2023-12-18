import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import InternalServerError from "../error/error.classes/InternalServerError";
import NotFoundError from "../error/error.classes/NotFoundError";

// Mail server configurations
const transporter = nodemailer.createTransport({
  service: "Gmail",
  // host: 'smtp.gmail.com',
  // port: 465,
  secure: true,
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_PASSWORD,
  },
});

const sendEmail = async (
  email: string,
  subject: string,
  htmlBody: string,
  attachment: any
) => {
  if (!email) throw new NotFoundError("Email is required!");
  if (!subject) throw new NotFoundError("Subject is required!");
  if (!htmlBody) throw new NotFoundError("HTML body is required!");

  const mailOptions: any = {
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
  } catch (error) {
    console.error("Error sending email:", error);
    throw new InternalServerError("Failed to send email");
  }
};

export { sendEmail };
