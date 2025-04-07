import { Agenda, Job } from "agenda";
import nodemailer from "nodemailer";

export const defineSendEmailJob = (agenda: Agenda) => {
  agenda.define("send email", async (job: Job<any>) => {
    const { to, subject, message } = job.attrs.data || {};

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "aman.0433.sagar@gmail.com",
        pass: "zxra tcie zlkp cfuq"
      }
    });
    try {
      const info = await transporter.sendMail({
        from: '"Aman Sagar" <aman.0433.sagar@gmail.com>',
        to: to as string[],
        subject: subject,
        text: message,
      });

    } catch (error) {
      console.error("Error sending email:", error);
    }
  });
};
