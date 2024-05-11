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

export const Z_UserSchema = z.object({
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

export const Z_UserSchemaWithId = Z_UserSchema.extend({
  _id: z.string(),
});

export type UserType = z.infer<typeof Z_UserSchema>;

export type UserTypeWithId = z.infer<typeof Z_UserSchemaWithId>;

interface UserModelType extends Model<UserType> {
  getAllUser(): Promise<UserTypeWithId[] | null>;
  getUserById(id: string): Promise<UserTypeWithId | null>;
  getUserByEmail(email: string): Promise<UserTypeWithId | null>;
  createUser(user: UserType): Promise<UserTypeWithId>;
  updateUser(userId: string, user: Partial<UserTypeWithId>): Promise<UserTypeWithId>;
}

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

UserSchema.static("createUser", async function (user: UserType) {
  return this.create(user);
});

UserSchema.static("updateUser", async function (userId: string, user: Partial<UserTypeWithId>) {
  return this.findByIdAndUpdate(userId, user, { new: true });
});

const User = connection.model<UserType, UserModelType>("User", UserSchema);

export default User;
