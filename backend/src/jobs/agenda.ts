// agenda.ts
import { Agenda } from "agenda";
import dotenv from "dotenv";
import { defineSendEmailJob } from "./definitions/sendEmailJob";
import { scheduleEmailReminder } from "./scheduler";

dotenv.config();

const MONGO_URL = `${process.env.MONGO_URI}`;

export const agenda = new Agenda({
  db: { address: MONGO_URL, collection: "agendaJobs" },
});

defineSendEmailJob(agenda);

export const startAgenda = async () => {
  await agenda.start();
  // await scheduleEmailReminder("jane@example.com", "Welcome!", "Thanks for signing up!");
};

export const stopAgenda = async () => {
  await agenda.stop();
};
