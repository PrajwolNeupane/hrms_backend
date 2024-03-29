import nodemailer from "nodemailer";

export default async function forgetPasswordMailSender({
  token,
  email,
  template,
}: {
  token: string;
  email: string;
  template: ({ token }: { token: string }) => string;
}) {
  try {
    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    // Verify connection configuration
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.log("Error verifying connection:", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    let message = {
      from: process.env.EMAIL,
      to: email,
      subject: "HRMS Password Forgot",
      html: template({ token }),
    };

    // Send email
    await new Promise((resolve, reject) => {
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          reject(error);
        } else {
          console.log("Email sent:", info.response);
          resolve(info);
        }
      });
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("-----ERROR-----");
    console.log(error);
  }
}
