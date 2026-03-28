import catchAsync from "../../utils/catchAsync.js";
import User from "../../model/userModel.js";
import jwt from "jsonwebtoken";
export const refresh = catchAsync(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  //checking in my Database
  const user = await User.findOne({ refreshToken: token });
  if (!user) return res.sendStatus(403);
  //new access Token create

  const newAccessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
  res.json({ accessToken: newAccessToken });
});
