export const sellerRegister = (storename, username, id, type) => {
  if (type === "resend") {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Details - Resent</title>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold;">Registration Details 📧</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Your Store Information (Resent)</p>
        </div>

        <div style="padding: 28px 24px; color: #333;">
            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5;">
                Hi <span style="font-weight: 600;">${username}</span>,
            </p>

            <p style="margin: 0 0 20px 0; font-size: 14px; color: #555; line-height: 1.6;">
                As requested, here are your store registration details. Your store is currently pending verification, and our team will contact you once the review is complete.
            </p>

            <div style="background: #f9f9f9; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 4px;">
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
            </div>

            <p style="margin: 16px 0; font-size: 12px; color: #777;">
                Status: <span style="color: #f59e0b; font-weight: 600;">Pending Verification</span>
            </p>

            <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 4px; margin-top: 20px;">
                <p style="margin: 0; font-size: 12px; color: #1e40af;">
                    ℹ️ This is a resent copy of your registration details. If you didn't request this, please contact support.
                </p>
            </div>
        </div>

        <div style="background: #f5f5f5; padding: 16px 24px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999; line-height: 1.6;">
            <p style="margin: 0;">© 2025 Your Store Platform. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
  }

  // Default template for initial registration
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform</title>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold;">Welcome! 🎉</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Your Store Registration Confirmed</p>
        </div>

        <div style="padding: 28px 24px; color: #333;">
            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5;">
                Hi <span style="font-weight: 600;">${username}</span>,
            </p>

            <p style="margin: 0 0 20px 0; font-size: 14px; color: #555; line-height: 1.6;">
                Thank you for registering with us! Your store has been successfully created and is now pending verification. Our team will review your store details and contact you shortly.
            </p>

            <div style="background: #f9f9f9; border-left: 4px solid #667eea; padding: 16px; margin: 20px 0; border-radius: 4px;">
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
            </div>

            <p style="margin: 16px 0; font-size: 12px; color: #777;">
                Status: <span style="color: #f59e0b; font-weight: 600;">Pending Verification</span>
            </p>
        </div>

        <div style="background: #f5f5f5; padding: 16px 24px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999; line-height: 1.6;">
            <p style="margin: 0;">© 2025 Your Store Platform. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
