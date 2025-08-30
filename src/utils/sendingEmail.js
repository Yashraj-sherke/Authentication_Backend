import nodemailer from "nodemailer";

const sendingEmail = async (options) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Wrap in an async IIFE so we can use await.

  const info = await transporter.sendMail({
    from: process.env.MAILTRAP_FROM,
  to: options.email,
  subject: options.subject,
  text:`${process.env.BASE_URL}/api/v1/user/${options.route}/${options.token}`,

  });

  console.log("Message sent:", info.messageId);

};

// const options={
//     email,
//     subject,
//     route,
//     token,

// }

export default sendingEmail;