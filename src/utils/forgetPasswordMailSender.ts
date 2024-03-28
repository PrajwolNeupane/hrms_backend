import nodemailer from "nodemailer";

export default function forgetPasswordMailSender({
  token,
  email,
  template,
}: {
  token: string;
  email: string;
  template: ({ token }: { token: string }) => string;
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
    subject: "HRMS Password Forgot",
    html: template({ token }),
  };

  transporter
    .sendMail(message)
    .then(() => {})
    .catch((error) => {
      console.log("-----ERROR-----");
      console.log(error);
    });
}
