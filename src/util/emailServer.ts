import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import InternalServerError from "../error/error.classes/InternalServerError";
import NotFoundError from "../error/error.classes/NotFoundError";

// Mail server configurations
const transporter = nodemailer.createTransport({
  service: "Gmail",
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

  let mailOptions: any = {
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

  transporter.sendMail(mailOptions, (err: any, data: any) => {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });
};

export { sendEmail };
