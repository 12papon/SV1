import express from "express";
import { login, signup, logout, userPatch } from "../controller/auth/auth.js";
import protect from "../middleware/jwt/tokenVerify.js";
import { refresh } from "../middleware/jwt/tokenRefresh.js";
import { createProduct } from "../controller/product/product.js";
import Test from "../controller/test/Test.js";
import getTestUser from "../controller/test/getTestUser.js";

const router = express.Router();

router.get("/get", protect, (req, res) => {
  const userid = req.user;
  res.status(200).json({
    name: userid.name,
    email: userid.email,
  });
});
router.get("/testget", getTestUser);
router.post("/test", Test);
router.post("/user", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/createp", createProduct);
router.patch("/patch/:id", userPatch);

export default router;
