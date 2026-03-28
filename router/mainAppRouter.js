import express from "express";
import { login, signup } from "../controller/auth/auth.js";
import protect from "../middleware/jwt/tokenVerify.js";
import { refresh } from "../middleware/jwt/tokenRefresh.js";

const router = express.Router();

router.get("/get", protect, (req, res) => {
  const accs = req.headers["authorization"].split(" ")[1];
  console.log(accs);

  const userid = req.user;
  res.status(200).json({
    name: userid.name,
    email: userid.email,
  });
});
router.post("/user", signup);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
