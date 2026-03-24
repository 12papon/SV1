import express from "express";
import { login, signup } from "../controller/auth/auth.js";
import protect from "../middleware/jwt/tokenVerify.js";

const router = express.Router();

router.get("/get", protect, (req, res) => {
  res.send("hallo main rout");
});
router.post("/user", signup);
router.post("/login", login);

export default router;
