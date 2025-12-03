const express = require("express");
const router = express.Router();

module.exports = function (usersCollection) {

  //  Auto-create user in MongoDB if not exists
  router.post("/", async (req, res) => {
    const user = req.body;

    try {
      const exists = await usersCollection.findOne({ email: user.email });

      if (exists) {
        return res.send({ message: "User already exists", user: exists });
      }

      // Assign default role = student
      user.role = user.role || "student";

      const result = await usersCollection.insertOne(user);
      res.send(result);

    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Failed to save user" });
    }
  });

  // Get single user by email
  router.get("/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email });

      res.send(user || null);
    } catch (err) {
      res.status(500).send({ message: "Failed to fetch user" });
    }
  });

  return router;
};
