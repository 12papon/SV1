import User from "../../model/userModel.js";
import catchAsync from "../../utils/catchAsync.js";
import error from "../../utils/error.js";
import generateToken from "../../service/generateToken.js";

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      status: "error",
      message: "Email already exist",
    });
  }

  const userObject = {
    name,
    email,
    password,
  };

  const newUser = new User(userObject);
  const savedUser = await newUser.save();

  return res.status(201).json({
    status: "Success",
    message: "User create Successfully!",
    data: savedUser,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new error("invalid email or password", 401));
  }
  const { accessToken, refreshToken } = generateToken(user);
  // const isMatch = await user.correctPassword(password, user.password);
  // console.log(isMatch);
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // ৭ দিন
  });
  const userObj = {
    name: user.name,
    token: accessToken,
    id: user._id,
  };
  res.status(200).json({
    status: "Success",
    data: userObj,
  });
});

export const logout = catchAsync(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  console.log(token);

  await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: "" });
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logout successfully!",
  });
});

//patching
export const userPatch = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  console.log(id);
  console.log(data);

  const user = await User.findOneAndUpdate({ _id: id }, data, {
    runValidators: true,
    returnDocument: "after",
  });
  res.send(user);
});
