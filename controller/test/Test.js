import userTest from "../../model/userTest.js";
const Test = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await userTest.findOne({ email });
  if (user) {
    return res.status(200).json({
      message: "User Already exist",
    });
  }

  const newUser = new userTest({
    firstName,
    lastName,
    email,
    password,
  });
  const savedUser = await newUser.save();
  res.status(201).json({
    success: true,
    message: savedUser._customMessage,
  });
};
export default Test;
