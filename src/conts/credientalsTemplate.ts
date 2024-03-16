export default function credientalsTemplate({
  email,
  password,
}: {
  email: string;
  password: string;
}): string {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>HRMS Credentials</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        
            h1 {
              color: #02092c;
            }
        
            p {
              color: #444444;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Your HRMS Credentials Have Been Created</h1>
            <p>Dear Employee,</p>
            <p>Your login credentials for the HRMS (Human Resource Management System) have been successfully created.</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>Please keep your credentials safe and do not share them with anyone. You can log in to the HRMS using the provided credentials to access various features and functionalities.</p>
            <p>Thank you for using our services!</p>
            <p>Sincerely,</p>
            <p>Innovation Nepal Team</p>
          </div>
        </body>
        </html>
        `;
}
