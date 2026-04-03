import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcrypt";

const userTest = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);
//pre save middleware
userTest.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash("MY_PREFIX_" + this.password, salt);
});
//post save middleware
userTest.post("save", async function (doc) {
  doc._customMessage = `Hallo ${doc.email} Saved in Database`;
});
//virtuals methodes
userTest.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userTest.set("toJSON", { virtuals: true });
userTest.set("toObject", { virtuals: true });

const TestUser = mongoose.model("Test", userTest);
export default TestUser;
