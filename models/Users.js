import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {

    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Users = models.users || model("users", userSchema);

export default Users;
