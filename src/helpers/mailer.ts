import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
        }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      });
    }

    const TOKEN = "****8344";

    const transport = Nodemailer.createTransport(
      MailtrapTransport({
        token: TOKEN,
        testInboxId: 3257487,
      })
    );

    // const sender = {
    //     address: "hello@example.com",
    //     name: "Mailtrap Test",
      
    //   };
      
    //   const recipients = [
    //     "capshield93@gmail.com",
    //   ];

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: `<p>Click <a href="${process.env.BASE_URL}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.</p> <br> <p>${process.env.BASE_URL}/verifyemail?token=${hashedToken}</p>`,
    };

    try {
      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
    } catch (error) {
      console.error("Error sending email:", error);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
