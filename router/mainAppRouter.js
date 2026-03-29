import express from "express";
import { login, signup, logout } from "../controller/auth/auth.js";
import protect from "../middleware/jwt/tokenVerify.js";
import { refresh } from "../middleware/jwt/tokenRefresh.js";
import { createProduct } from "../controller/product/product.js";

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
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/createp", createProduct);

export default router;
