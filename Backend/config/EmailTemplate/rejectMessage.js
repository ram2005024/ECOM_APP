export const rejectMessageTemplate = (
  storename,
  username,
  id,
  rejectionMessage
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Status Update</title>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold;">Application Status</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Your store application requires revision</p>
        </div>

        <div style="padding: 28px 24px; color: #333;">
            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5;">
                Hi <span style="font-weight: 600;">${username}</span>,
            </p>

            <p style="margin: 0 0 20px 0; font-size: 14px; color: #555; line-height: 1.6;">
                Thank you for applying to our platform. Unfortunately, your store application could not be approved at this time. Please review the feedback below and reapply once you have addressed the issues.
            </p>

            <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <div style="margin: 12px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Store Name:</span>
                    <p style="margin: 4px 0 0 0; color: #333;">${storename}</p>
                </div>
                <div style="margin: 12px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Shop ID:</span>
                    <p style="margin: 4px 0 0 0; color: #333;">#${id}</p>
                </div>
            </div>

            <div style="background: #fff5f5; border: 1px solid #fecaca; padding: 16px; margin: 20px 0; border-radius: 6px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #991b1b;">Reason for Rejection:</p>
                <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">${rejectionMessage}</p>
            </div>

            <p style="margin: 16px 0; font-size: 12px; color: #777;">
                <span style="font-weight: 600;">Status:</span> <span style="color: #ef4444; font-weight: 600;">✕ Rejected</span>
            </p>

            <div style="background: #fef2f2; padding: 12px; margin: 16px 0; border-radius: 4px; border-left: 3px solid #ef4444;">
                <p style="margin: 0; font-size: 12px; color: #555;">
                    <span style="font-weight: 600;">What you can do:</span> Address the issues mentioned above and submit a new application. We're here to help you succeed on our platform.
                </p>
            </div>

            <div style="text-align: center; margin: 24px 0;">
                <a href="https://yourplatform.com/reapply/${id}" style="display: inline-block; background: #ef4444; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Reapply Now</a>
            </div>

            <p style="margin: 16px 0 0 0; font-size: 12px; color: #999; text-align: center;">
                Have questions? <a href="https://yourplatform.com/support" style="color: #ef4444; text-decoration: none; font-weight: 600;">Contact Support</a>
            </p>
        </div>

        <div style="background: #f5f5f5; padding: 16px 24px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999; line-height: 1.6;">
            <p style="margin: 0;">© 2025 Your Store Platform. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
