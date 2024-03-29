"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function forgotPasswordTemplate({ token, }) {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>HRMS Forgot Password</title>
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
                <h1>Reset Your HRMS Password</h1>
                <p>Dear Employee,</p>
                <p>We have received a request to reset your password for the HRMS (Human Resource Management System).</p>
                <p>To reset your password, please use the following token:</p>
                <p><strong>Token:</strong> ${token}</p>
                <p>If you did not request this password reset, you can safely ignore this email.</p>
                <p>Thank you for using our services!</p>
                <p>Sincerely,</p>
                <p>Innovation Nepal Team</p>
              </div>
            </body>
            </html>
            `;
}
exports.default = forgotPasswordTemplate;
//# sourceMappingURL=forgetPasswordTemplate.js.map