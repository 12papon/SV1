import express from "express";
import cors from "cors";
import mainAppRouter from "./router/mainAppRouter.js";
import connectDB from "./config/databaseConfig/DB.js";
import allowOrigin from "./utils/allowOrigin.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors(allowOrigin));
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(mainAppRouter);

//universel error handeling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // ডেভেলপমেন্ট এনভায়রনমেন্টে বিস্তারিত এরর দেখানো
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // প্রোডাকশনে ইউজারকে শুধু প্রয়োজনীয় মেসেজ দেখানো
  else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message || "Something went wrong!",
    });
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server Listen To port : ${process.env.PORT}`);
});
