const express = require("express");
const router = express.Router();

module.exports = function (usersCollection) {

  // Get all users
  router.get("/", async (req, res) => {
    const users = await usersCollection.find().toArray();
    res.send(users);
  });

  // Get a single user by email
  router.get("/:email", async (req, res) => {
    const email = req.params.email;
    const user = await usersCollection.findOne({ email });
    res.send(user);
  });

  // Create new user
  router.post("/", async (req, res) => {
    const user = req.body;

    // Check existing user
    const exists = await usersCollection.findOne({ email: user.email });
    if (exists) {
      return res.send({
        insertedId: null,
        message: "User already exists",
        user: exists
      });
    }

    // Assign default role
    const newUser = {
      ...user,
      role: "student",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    res.send(result);
  });

  return router;
};
