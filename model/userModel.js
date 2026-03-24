import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: { type: String, trim: true, required: true, min: 3 },
  email: { type: String, trim: true, unique: true, required: true },
  password: { type: Number, trim: true, required: true },
});

const User = mongoose.model("User", userModel);
export default User;
