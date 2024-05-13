import mongoose, { Model, Schema } from "mongoose";
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

const Z_UrgentImportantTask = z.object({
  name: z.string(),
  progress: z.number(),
  remainingTime: z.string(),
  theme: z.string(),
  status: z.boolean(),
  time: z.string(),
});

const Z_DailyTask = z.object({
  name: z.string(),
  status: z.boolean(),
});

const Z_BaseUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  mobile: z.string(),
  address: z.string(),
  dob: z.string(),
  isAdmin: z.boolean(),
  postal_code: z.string(),
  city: z.string(),
  state: z.string(),
  ctry: z.string(),
});

const Z_UserSchema = Z_BaseUserSchema.extend({
  urgentImportantTask: Z_UrgentImportantTask.array(),
  dailyTask: Z_DailyTask.array(),
});

const Z_UserSchemaWithId = Z_UserSchema.extend({
  _id: z.string(),
  urgentImportantTask: Z_UrgentImportantTask.extend({
    _id: z.string(),
  }).array(),
  dailyTask: Z_DailyTask.extend({
    _id: z.string(),
  }).array(),
});

export type UserType = z.infer<typeof Z_UserSchema>;

export type UserTypeWithId = z.infer<typeof Z_UserSchemaWithId>;

export type UrgentTaskType = z.infer<typeof Z_UrgentImportantTask>;

export type UrgentTaskTypeWithId = z.infer<typeof Z_UrgentImportantTask> & {
  id: string;
};

export type DailyTaskType = z.infer<typeof Z_DailyTask>;

export type DailyTaskTypeWithId = z.infer<typeof Z_DailyTask> & {
  id: string;
};

interface UserModelType extends Model<UserType> {
  getUserById(id: string): Promise<UserTypeWithId | null>;
  getUserByEmail(email: string): Promise<UserTypeWithId | null>;
  createUser(user: Omit<UserType, "urgentImportantTask" | "dailyTask">): Promise<UserTypeWithId>;
  updateUser(userId: string, user: Partial<UserTypeWithId>): Promise<UserTypeWithId>;
  addUrgentImportantTask(userId: string, taskDetails: UrgentTaskType): Promise<UserTypeWithId>;
  addDailyTask(userId: string, taskDetails: DailyTaskType): Promise<UserTypeWithId>;
  setDailyTaskDone(userId: string, taskId: string, status: boolean): Promise<UserTypeWithId>;
}

interface UrgentTaskModelType extends Model<UrgentTaskType> {}
interface DailyTaskModelType extends Model<DailyTaskType> {}

const UrgentTaskSchemaObj = new Schema<UrgentTaskType, UrgentTaskModelType>({
  name: { type: String, required: true },
  progress: { type: Number, required: true },
  remainingTime: { type: String, required: true },
  theme: { type: String, required: true },
  status: { type: Boolean, required: true },
  time: { type: String, required: true },
});

const DailyTaskSchemaObj = new Schema<DailyTaskType, DailyTaskModelType>({
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
});

const SchemaObj = {
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  postal_code: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  ctry: { type: String, required: true },
  urgentImportantTask: [UrgentTaskSchemaObj],
  dailyTask: [DailyTaskSchemaObj],
};

const UserSchema = new Schema<UserType, UserModelType>(SchemaObj);

UserSchema.static("getAllUser", async function () {
  return await this.find();
});

UserSchema.static("getUserById", async function (id: string) {
  return await this.findById(id);
});

UserSchema.static("getUserByEmail", async function (email: string) {
  return await this.findOne({ email });
});

UserSchema.static("createUser", async function (user: Omit<UserType, "urgentImportantTask" | "dailyTask">) {
  return this.create(user);
});

UserSchema.static("updateUser", async function (userId: string, user: Partial<UserTypeWithId>) {
  return this.findByIdAndUpdate(userId, user, { new: true });
});

UserSchema.static("addUrgentImportantTask", async function (userId: string, taskDetails: UrgentTaskType) {
  if (!userId || !Object.keys(taskDetails).length) throw new Error("userId or taskDetails are empty");
  const user = this.findById(userId);
  if (!user) throw new Error("User not found");

  return this.findByIdAndUpdate(userId, { $push: { urgentImportantTask: { ...taskDetails } } }, { new: true });
});

UserSchema.static("addDailyTask", async function (userId: string, taskDetails: DailyTaskType) {
  if (!userId || !Object.keys(taskDetails).length) throw new Error("userId or taskArray is empty");
  const user = this.findById(userId);
  if (!user) throw new Error("User not found");

  return this.findByIdAndUpdate(userId, { $push: { dailyTask: { ...taskDetails } } }, { new: true });
});

UserSchema.static("setDailyTaskDone", async function (userId: string, taskId: string, status: boolean) {
  if (!userId || !taskId) throw new Error("user id or task id not obtained");

  const user = this.findById(userId);
  if (!user) throw new Error("User not found");

  return this.findOneAndUpdate(
    { _id: userId, "dailyTask._id": taskId },
    { $set: { "dailyTask.$.status": status } },
    { new: true }
  );
});

const User = connection.model<UserType, UserModelType>("User", UserSchema);

export default User;
