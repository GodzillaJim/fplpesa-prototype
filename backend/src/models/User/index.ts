import { model, Schema } from "mongoose";
import { roleSchema } from "../Role";

const userSchema = new Schema(
  {
    firebaseId: String,
    roles: {
      type: [roleSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
