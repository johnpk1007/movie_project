import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  id: { type: String },
  src: { type: String },
  email_verified: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
