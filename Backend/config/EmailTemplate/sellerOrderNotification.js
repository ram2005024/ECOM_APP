export function sendSellerNotificationTemplate(
  storename,
  sellername,
  customerName
) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 30px; background-color: #4CAF50; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                ${storename}
              </h1>
            </td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">
                🎉 New Order Received!
              </h2>
              
              <p style="margin: 0 0 15px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                Hello <strong style="color: #333333;">${sellername}</strong>,
              </p>
              
              <p style="margin: 0 0 15px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                Great news! You have received a new order from <strong style="color: #333333;">${customerName}</strong>.
              </p>
              
              <p style="margin: 0 0 25px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                Please log in to your seller dashboard to view the order details and prepare it for shipment.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="#" style="display: inline-block; padding: 15px 40px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                      View Order Details
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Order Info Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: #f9f9f9; border-radius: 5px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                      <strong style="color: #333333;">Store:</strong> ${storename}
                    </p>
                    <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                      <strong style="color: #333333;">Seller:</strong> ${sellername}
                    </p>
                    <p style="margin: 0; color: #666666; font-size: 14px;">
                      <strong style="color: #333333;">Customer:</strong> ${customerName}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f4f4f4; text-align: center; border-top: 1px solid #dddddd;">
              <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
                Thank you for being a valued seller at ${storename}
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                © ${new Date().getFullYear()} ${storename}. All rights reserved.
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
}
