const express = require("express");
const router = express.Router();

module.exports = function (eventsCollection) {

  // GET all events
  router.get("/", async (req, res) => {
    try {
      const events = await eventsCollection.find().toArray();
      res.send(events);
    } catch (err) {
      res.status(500).send({ message: "Failed to load events" });
    }
  });

  return router;
};
