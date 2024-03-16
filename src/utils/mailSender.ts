import nodemailer from "nodemailer";

export default function mailSender({
  email,
  password,
  template,
}: {
  email: string;
  password: string;
  template: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => string;
}) {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: "HRMS Credientals Created",
    html: template({ email, password }),
  };

  transporter
    .sendMail(message)
    .then(() => {})
    .catch((error) => {
      console.log("-----ERROR-----");
      console.log(error);
    });
}
