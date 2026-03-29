import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, min: 3 },
    email: { type: String, trim: true, unique: true, required: true },
    password: {
      type: Number,
      trim: true,
      required: true,
      // select: false,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "দয়া করে একটি সঠিক ইমেইল দিন",
      ],
    },
    refreshToken: { type: String }, // এখানে টোকেনটি সেভ হবে
  },
  { timestamps: true },
);

userModel.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  console.log(candidatePassword);
  console.log(userPassword);

  return candidatePassword === userPassword;
};
const User = mongoose.model("User", userModel);
export default User;
