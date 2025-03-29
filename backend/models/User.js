// backend/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true }, // User's first name
    lastName: { type: String, required: true }, // User's last name
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }, // User's email address
    password: {
      type: String,
      required: true,
      select: false,
    }, // Hashed password; 'select: false' hides it from queries by default
    role: { type: String, default: "user" }, // User role (e.g., "user", "admin")
  },
  { timestamps: true }
);

// Instance method to compare provided password with stored hash
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default model("User", UserSchema);
