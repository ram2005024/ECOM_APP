export const contactEmailTemplate = ({ name, email, subject, message }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #2563eb; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="color: #475569; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                    You have received a new message from your contact form.
                  </p>
                  
                  <!-- Details Table -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                    <tr>
                      <td style="padding: 15px; background-color: #f1f5f9; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 5px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                        <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600;">${name}</p>
                      </td>
                    </tr>
                    <tr><td style="height: 10px;"></td></tr>
                    <tr>
                      <td style="padding: 15px; background-color: #f1f5f9; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 5px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                        <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                          <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                        </p>
                      </td>
                    </tr>
                    <tr><td style="height: 10px;"></td></tr>
                    <tr>
                      <td style="padding: 15px; background-color: #f1f5f9; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 5px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</p>
                        <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600;">${subject}</p>
                      </td>
                    </tr>
                    <tr><td style="height: 10px;"></td></tr>
                    <tr>
                      <td style="padding: 15px; background-color: #f1f5f9; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 5px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                        <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 20px 30px; background-color: #f8fafc; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                    This email was sent from your website contact form
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
