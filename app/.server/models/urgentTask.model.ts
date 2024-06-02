import mongoose, { Model, Schema } from "mongoose";
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

const Z_UrgentImportantTask = z.object({
  name: z.string(),
  progress: z.number(),
  remainingTime: z.string(),
  theme: z.string(),
  status: z.boolean(),
  time: z.string(),
  shouldNotify: z.boolean().optional().default(false),
  user: z.string(),
});

export type UrgentTaskType = z.infer<typeof Z_UrgentImportantTask>;

export type UrgentTaskTypeWithId = z.infer<typeof Z_UrgentImportantTask> & {
  _id: string;
};

interface UrgentTaskModelType extends Model<UrgentTaskType> {
  getAllUrgentTask(userId: string): Promise<UrgentTaskTypeWithId[] | null>;
  getTaskById(taskId: string): Promise<UrgentTaskTypeWithId | null>;
  addUrgentImportantTask(userId: string, taskDetails: UrgentTaskType): Promise<UrgentTaskTypeWithId>;
  updateTask(taskId: string, taskDetails: Partial<UrgentTaskType>): Promise<UrgentTaskTypeWithId>;
}

const UrgentTaskSchemaObj = new Schema<UrgentTaskType, UrgentTaskModelType>({
  name: { type: String, required: true },
  progress: { type: Number, required: true },
  remainingTime: { type: String, required: true },
  theme: { type: String, required: true },
  status: { type: Boolean, required: true },
  time: { type: String, required: true },
  shouldNotify: { type: Boolean, default: false },
  // @ts-ignore
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

UrgentTaskSchemaObj.static("getAllUrgentTask", async function (userId: string) {
  console.log("MODEL: URGENT TASK: GetAllUrgentTask", userId);
  return await this.find({ user: userId });
});

UrgentTaskSchemaObj.static("getTaskById", async function (taskId: string) {
  return await this.findById(taskId);
});

UrgentTaskSchemaObj.static("addUrgentImportantTask", async function (userId: string, taskDetails: UrgentTaskType) {
  if (!userId || !Object.keys(taskDetails).length) throw new Error("userId or taskDetails are empty");
  const user = User.findById(userId);
  if (!user) throw new Error("User not found");

  return this.create(taskDetails);
});

UrgentTaskSchemaObj.static("updateTask", async function (taskId: string, taskDetails: Partial<UrgentTaskType>) {
  if (!taskId) throw new Error("Task id not provided");

  return this.findOneAndUpdate({ _id: taskId }, taskDetails, { new: true });
});

const UrgentTask = connection.model<UrgentTaskType, UrgentTaskModelType>("UrgentTask", UrgentTaskSchemaObj);

export default UrgentTask;
