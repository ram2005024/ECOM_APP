export const adminReviewEmail = (
  storename,
  username,
  shopId,
  type,
  registrationDate
) => {
  if (type === "resend") {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Registration Reminder - Admin Review</title>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold;">⏰ Pending Seller Review Reminder</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Action still required</p>
        </div>

        <div style="padding: 28px 24px; color: #333;">
            <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 12px; border-radius: 4px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 600;">
                    ⚠️ Reminder: This seller registration is still pending your review.
                </p>
            </div>

            <p style="margin: 0 0 20px 0; font-size: 14px; color: #555; line-height: 1.6;">
                This is a reminder that the following seller registration has not yet been reviewed. Please take action at your earliest convenience.
            </p>

            <div style="background: #eff6ff; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Store Name:</span>
                    <span style="color: #333; font-weight: 500;">${storename}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Owner Name:</span>
                    <span style="color: #333; font-weight: 500;">${username}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Shop ID:</span>
                    <span style="color: #333; font-weight: 500;">#${shopId}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Registered:</span>
                    <span style="color: #333; font-weight: 500;">${registrationDate}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Status:</span>
                    <span style="color: #f59e0b; font-weight: 600;">Pending Review</span>
                </div>
            </div>

            <p style="margin: 20px 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Action Required:</p>

            <div style="display: flex; gap: 12px; margin: 20px 0;">
                <a href="https://yourplatform.com/admin/sellers/${shopId}/approve" style="flex: 1; display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; text-align: center;">✓ Approve Seller</a>
                <a href="https://yourplatform.com/admin/sellers/${shopId}/reject" style="flex: 1; display: inline-block; background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; text-align: center;">✕ Reject Seller</a>
            </div>

            <p style="margin: 16px 0; font-size: 12px; color: #777;">
                Review the seller's details before approving. Click the links above to take action or visit the admin dashboard.
            </p>

            <div style="background: #f9f9f9; padding: 12px; margin: 16px 0; border-radius: 4px; border-left: 3px solid #f59e0b;">
                <p style="margin: 0; font-size: 12px; color: #555;">
                    <span style="font-weight: 600;">Note:</span> Please verify all documents and store information before approval.
                </p>
            </div>
        </div>

        <div style="background: #f5f5f5; padding: 16px 24px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 11px; color: #999; line-height: 1.5;">
            <p style="margin: 0;">© 2025 Your Store Platform. Admin Dashboard</p>
        </div>
    </div>
</body>
</html>`;
  }

  // Default template for initial admin notification
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Seller Registration - Admin Review</title>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold;">📋 New Seller Registration</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Requires your review and approval</p>
        </div>

        <div style="padding: 28px 24px; color: #333;">
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #555; line-height: 1.6;">
                A new seller has registered on the platform and is waiting for your approval.
            </p>

            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Store Name:</span>
                    <span style="color: #333; font-weight: 500;">${storename}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Owner Name:</span>
                    <span style="color: #333; font-weight: 500;">${username}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Shop ID:</span>
                    <span style="color: #333; font-weight: 500;">#${shopId}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Registered:</span>
                    <span style="color: #333; font-weight: 500;">${registrationDate}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px;">
                    <span style="color: #666; font-weight: 600;">Status:</span>
                    <span style="color: #f59e0b; font-weight: 600;">Pending Review</span>
                </div>
            </div>

            <p style="margin: 20px 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Action Required:</p>

            <div style="display: flex; gap: 12px; margin: 20px 0;">
                <a href="https://yourplatform.com/admin/sellers/${shopId}/approve" style="flex: 1; display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; text-align: center;">✓ Approve Seller</a>
                <a href="https://yourplatform.com/admin/sellers/${shopId}/reject" style="flex: 1; display: inline-block; background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; text-align: center;">✕ Reject Seller</a>
            </div>

            <p style="margin: 16px 0; font-size: 12px; color: #777;">
                Review the seller's details before approving. Click the links above to take action or visit the admin dashboard.
            </p>

            <div style="background: #f9f9f9; padding: 12px; margin: 16px 0; border-radius: 4px; border-left: 3px solid #f59e0b;">
                <p style="margin: 0; font-size: 12px; color: #555;">
                    <span style="font-weight: 600;">Note:</span> Please verify all documents and store information before approval.
                </p>
            </div>
        </div>

        <div style="background: #f5f5f5; padding: 16px 24px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 11px; color: #999; line-height: 1.5;">
            <p style="margin: 0;">© 2025 Your Store Platform. Admin Dashboard</p>
        </div>
    </div>
</body>
</html>`;
};
