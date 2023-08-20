import mongoose from "mongoose";

export enum RoleType {
  ADMIN,
  WRITER,
  CUSTOMER,
  GUEST,
}

export const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: RoleType,
      default: RoleType.CUSTOMER,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
