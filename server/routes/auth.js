const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const ADMIN = { username: "admin", password: "password" };

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign({ username }, "secret123", { expiresIn: "1d" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
