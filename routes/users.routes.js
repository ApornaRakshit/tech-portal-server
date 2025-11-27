const express = require("express");
const router = express.Router();

module.exports = function (usersCollection) {
  router.get("/", async (req, res) => {
    const users = await usersCollection.find().toArray();
    res.send(users);
  });

  router.post("/", async (req, res) => {
    const user = req.body;

    const exists = await usersCollection.findOne({ email: user.email });
    if (exists) return res.send({ insertedId: null, message: "User already exists" });

    const result = await usersCollection.insertOne(user);
    res.send(result);
  });

  return router;
};
