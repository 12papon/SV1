import express from "express";

const router = express.Router();

router.get("/get", (req, res) => {
  res.send("hallo main rout");
});

export default router;
