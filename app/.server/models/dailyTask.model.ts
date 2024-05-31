import mongoose, { Model, Schema, Types } from "mongoose";
import { z } from "zod";
import User from "./user.model";

const DB_URI = process.env.DB_CONNECT;

if (!DB_URI) {
  throw new Error("DB_CONNECT env not found");
}
const connection = mongoose.createConnection(DB_URI);

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const Z_DailyTask = z.object({
  name: z.string(),
  status: z.boolean(),
  user: z.string(),
});

export type DailyTaskType = z.infer<typeof Z_DailyTask>;

export type DailyTaskTypeWithId = z.infer<typeof Z_DailyTask> & {
  _id: string;
};

interface DailyTaskModelType extends Model<DailyTaskType> {
  getAllDailyTask(userId: string): Promise<DailyTaskTypeWithId[] | null>;
  addDailyTask(userId: string, taskDetails: DailyTaskType): Promise<DailyTaskTypeWithId>;
  setDailyTaskDone(userId: string, taskId: string, status: boolean): Promise<DailyTaskTypeWithId>;
}

const DailyTaskSchemaObj = new Schema<DailyTaskType, DailyTaskModelType>({
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
  //@ts-ignore
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

DailyTaskSchemaObj.static("getAllDailyTask", async function (userId: string) {
  console.log("MODEL: DAILY TASK: GetAllDailyTask", userId);
  return await this.find({ user: userId });
});

DailyTaskSchemaObj.static("addDailyTask", async function (userId: string, taskDetails: DailyTaskType) {
  if (!userId || !Object.keys(taskDetails).length) throw new Error("userId or taskArray is empty");
  const user = User.findById(userId);
  if (!user) throw new Error("User not found");

  return this.create(taskDetails);
});

DailyTaskSchemaObj.static("setDailyTaskDone", async function (userId: string, taskId: string, status: boolean) {
  console.log("MODEL: DAILY TASK: setDailyTaskDone", userId, taskId);
  if (!userId || !taskId) throw new Error("user id or task id not obtained");

  const user = User.findById(userId);
  if (!user) throw new Error("User not found");

  const task = this.findById(taskId);
  if (!task) throw new Error("Task not found");
  console.log("MODEL: DAILY TASK: setDailyTaskDone: user & task", user, task);

  return this.findOneAndUpdate({ _id: taskId }, { status: status }, { new: true });
});

const DailyTask = connection.model<DailyTaskType, DailyTaskModelType>("DailyTask", DailyTaskSchemaObj);

export default DailyTask;
