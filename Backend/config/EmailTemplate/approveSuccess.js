export const approveSuccessEmail = (
  storename,
  username,
  id,
  registrationDate,
  approvedAt
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Store Approved Successfully</title>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold;">🎉 Congratulations!</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Your store has been approved and is now live</p>
        </div>

        <div style="padding: 28px 24px; color: #333;">
            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5;">
                Hi <span style="font-weight: 600;">${username}</span>,
            </p>

            <p style="margin: 0 0 20px 0; font-size: 14px; color: #555; line-height: 1.6;">
                Great news! Your store has been successfully reviewed and approved by our admin team. Your store is now live and ready to accept orders. You can start uploading your products and managing your inventory.
            </p>

            <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <div style="display: flex; justify-content: space-between; margin: 12px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Store Name:</span>
                    <span style="color: #333; font-weight: 500;">${storename}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 12px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Username:</span>
                    <span style="color: #333; font-weight: 500;">${username}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 12px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Shop ID:</span>
                    <span style="color: #333; font-weight: 500;">#${id}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 12px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Registered:</span>
                    <span style="color: #333; font-weight: 500;">${registrationDate}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 12px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Approved:</span>
                    <span style="color: #10b981; font-weight: 600;">${approvedAt}</span>
                </div>
            </div>

            <p style="margin: 16px 0; font-size: 12px; color: #777;">
                <span style="font-weight: 600;">Status:</span> <span style="color: #10b981; font-weight: 600;">✓ Active</span>
            </p>

            <div style="text-align: center; margin: 24px 0;">
                <a href="https://yourplatform.com/dashboard" style="display: inline-block; background: #10b981; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Go to Dashboard</a>
            </div>

            <div style="background: #f9f9f9; padding: 12px; margin: 16px 0; border-radius: 4px; border-left: 3px solid #10b981;">
                <p style="margin: 0; font-size: 12px; color: #555;">
                    <span style="font-weight: 600;">Next Steps:</span> Complete your store profile, add products, and set up payment methods to start receiving orders.
                </p>
            </div>
        </div>

        <div style="background: #f5f5f5; padding: 16px 24px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999; line-height: 1.6;">
            <p style="margin: 0;">© 2025 Your Store Platform. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
