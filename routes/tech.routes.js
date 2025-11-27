const express = require("express");
const router = express.Router();

module.exports = function (techCollection) {
  router.get("/", async (req, res) => {
    const techs = await techCollection.find().toArray();
    res.send(techs);
  });

  router.post("/", async (req, res) => {
    try {
      const result = await techCollection.insertOne(req.body);
      res.send(result);
    } catch {
      res.status(500).send({ message: "Failed to insert tech" });
    }
  });

  return router;
};
