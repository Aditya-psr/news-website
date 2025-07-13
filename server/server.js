const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/articles", require("./routes/articles"));
app.use("/api/auth", require("./routes/auth"));

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(5000, () =>
      console.log("Server running on http://localhost:5000")
    );
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();
