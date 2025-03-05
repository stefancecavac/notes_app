import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendMagicLinkEmail = async (email: string) => {
  try {
    const token = jwt.sign({ email }, process.env.MAGIC_LINK_SECRET as string, { expiresIn: "15m" });
    const magicLink = `${process.env.FRONTEND_URL}/magic-login?token=${token}`;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your Magic Login Link",
      html: `<p>Click <a href="${magicLink}">here</a> to log in. This link will expire in 15 minutes.</p>`,
    });
  } catch (error) {
    console.error("Error sending magic link:", error);
    throw new Error("Failed to send magic link email");
  }
};
