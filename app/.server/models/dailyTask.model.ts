import mongoose, { Model, Schema, Types } from "mongoose";
import { z } from "zod";

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
  user: z.instanceof(mongoose.Types.ObjectId),
});

export type DailyTaskType = z.infer<typeof Z_DailyTask>;

export type DailyTaskTypeWithId = z.infer<typeof Z_DailyTask> & {
  id: string;
};

interface DailyTaskModelType extends Model<DailyTaskType> {
  addDailyTask(userId: string, taskDetails: DailyTaskType): Promise<DailyTaskTypeWithId>;
  setDailyTaskDone(userId: string, taskId: string, status: boolean): Promise<DailyTaskTypeWithId>;
}

const DailyTaskSchemaObj = new Schema<DailyTaskType, DailyTaskModelType>({
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

DailyTaskSchemaObj.static("addDailyTask", async function (userId: string, taskDetails: DailyTaskType) {
  // if (!userId || !Object.keys(taskDetails).length) throw new Error("userId or taskArray is empty");
  // const user = this.findById(userId);
  // if (!user) throw new Error("User not found");

  // return this.findByIdAndUpdate(userId, { $push: { dailyTask: { ...taskDetails } } }, { new: true });
  return "Daily Task added";
});

DailyTaskSchemaObj.static("setDailyTaskDone", async function (userId: string, taskId: string, status: boolean) {
  // if (!userId || !taskId) throw new Error("user id or task id not obtained");

  // const user = this.findById(userId);
  // if (!user) throw new Error("User not found");

  // return this.findOneAndUpdate(
  //   { _id: userId, "dailyTask._id": taskId },
  //   { $set: { "dailyTask.$.status": status } },
  //   { new: true }
  // );
  return "Daily Task updated";
});

const DailyTask = connection.model<DailyTaskType, DailyTaskModelType>("DailyTask", DailyTaskSchemaObj);

export default DailyTask;
