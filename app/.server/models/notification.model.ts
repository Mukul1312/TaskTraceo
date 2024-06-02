import Agenda from "agenda";
import mongoose, { Model, Schema } from "mongoose";
import { z } from "zod";
import UrgentTask from "./urgentTask.model";

const DB_URI = process.env.DB_CONNECT;

if (!DB_URI) {
  throw new Error("DB_CONNECT env not found");
}
const connection = mongoose.createConnection(DB_URI);

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const Z_Subscription = z.object({
  endpoint: z.string(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});

export type subscription = z.infer<typeof Z_Subscription>;

const Z_Notification = z.object({
  subscription: Z_Subscription,
  taskId: z.string(),
});

type NotificationType = z.infer<typeof Z_Notification>;

export type NotificationTypeWithId = z.infer<typeof Z_Notification> & {
  _id: string;
};

interface NotificationModelType extends Model<NotificationType> {
  subscribeNotification(taskId: string, subscription: subscription): Promise<NotificationTypeWithId>;
  unsubscribeNotification(taskId: string): Promise<NotificationTypeWithId>;
}

const NotificationSchemaObj = new Schema<NotificationType, NotificationModelType>({
  //@ts-ignore
  taskId: { type: Schema.Types.ObjectId, ref: UrgentTask, required: true },
  subscription: {
    endpoint: { type: String, required: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },
});

NotificationSchemaObj.static("subscribeNotification", async function (taskId: string, subscription: subscription) {
  console.log("MODEL: NOTIFICATION", taskId, subscription);

  return this.create({ taskId, subscription });
});

NotificationSchemaObj.static("unsubscribeNotification", async function (taskId: string) {
  console.log("MODEL: NOTIFICATION", taskId);

  return this.findOneAndDelete({ taskId: taskId });
});

const Notification = connection.model<NotificationType, NotificationModelType>("Notification", NotificationSchemaObj);

export default Notification;

export const agenda = new Agenda({ db: { address: DB_URI } });
