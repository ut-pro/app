import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./user.model.js";

const app = express();

app.use(express.json());

app.use(cors());

app.post("/create", async (req, res) => {
  try {
    const user = req.body;
    if (!user || user.name === "") {
      return res.status(400).send("Invalid user data");
    }
    await User.create(user);
    res.status(201).send("user created");
  } catch (error) {
    res.status(500).send("user not created");
    console.error(error);
  }
});

app.get("/show", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("failed to fetch the users");
    console.error(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID");
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(201).send("user got deleted");
  } catch (error) {
    res.status(500).send("user not get deleted");
    console.error(error);
  }
});

app.listen(3000, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ut-pro:ut-pro@cluster0.vefqv.mongodb.net/shesha"
    );
    console.log("database connected");
    console.log("server is running at 3000");
  } catch (error) {
    console.error("Database connection error:", error);
  }
});
