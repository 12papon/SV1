import jwt from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync.js";
import error from "../../utils/error.js";
import { promisify } from "util";
import User from "../../model/userModel.js";

const protect = catchAsync(async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) return next(new error("You are not logged in", 401));
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_SECRET,
  );
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new error("User no longer exists", 401));
  req.user = currentUser;
  res.send(decoded.id);
  next();
});

export default protect;
