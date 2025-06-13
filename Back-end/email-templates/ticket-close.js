export const generateTicketClosedHtml = ({
    userName,
    ticketTitle,
    ticketId,
    closedAt,
}) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9fafb;">
    <h2 style="color: #00b894;">✅ Ticket Closed Notification</h2>

    <p style="font-size: 16px; color: #333;">
      Hello <strong>${userName}</strong>,<br /><br />
      We’re writing to inform you that your ticket has been successfully closed. Below are the ticket details for your reference:
    </p>

    <div style="margin: 25px 0; background: #ffffff; padding: 20px; border-left: 5px solid #00b894; box-shadow: 0 1px 5px rgba(0,0,0,0.05);">
      <h3 style="margin-top: 0; color: #222;">🧾 Ticket Summary</h3>
      <ul style="line-height: 1.8; padding-left: 0; list-style: none;">
        <li><strong>🎫 Title:</strong> ${ticketTitle}</li>
        <li><strong>🆔 Ticket ID:</strong> ${ticketId}</li>
        <li><strong>📅 Closed At:</strong> ${closedAt}</li>
       
      </ul>
    </div>

    <p style="font-size: 16px; color: #333;">
      If the issue still persists or you need further assistance, feel free to reopen the ticket or contact our support team.
    </p>

    <p style="margin-top: 40px; font-size: 14px; color: #888;">
      Thank you for reaching out to us.
    </p>

    <p style="font-size: 14px; color: #aaa; margin-top: 20px;">
      – The INNGEST MS Team
    </p>
  </div>
`;
