import Agenda from "agenda";
import { sendNotification } from "./push";
const DB_URI = process.env.DB_CONNECT;

if (!DB_URI) {
  throw new Error("DB_CONNECT env not found");
}
export const agenda = new Agenda({ db: { address: DB_URI } });
