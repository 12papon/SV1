import express from "express";
import mainAppRouter from "./router/mainAppRouter.js";
import connectDB from "./config/databaseConfig/DB.js";

const app = express();
connectDB();

app.use(express.json());
app.use(mainAppRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server Listen To port : ${process.env.PORT}`);
});
