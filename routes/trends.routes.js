const express = require("express");

module.exports = function (trendsCollection) {
  const router = express.Router();

  // -----------------------------
  // ADD NEW TREND (POST)
  // -----------------------------
  router.post("/", async (req, res) => {
    try {
      const trend = req.body;
      const result = await trendsCollection.insertOne(trend);

      res.send({
        success: true,
        insertedId: result.insertedId,
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // -----------------------------
  // GET ALL TRENDS (GET)
  // -----------------------------
  router.get("/", async (req, res) => {
    try {
      const trends = await trendsCollection.find().toArray();
      res.send(trends);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  return router;
};
