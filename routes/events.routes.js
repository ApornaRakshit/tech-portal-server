const express = require("express");
const router = express.Router();

module.exports = function (eventsCollection) {
  
  //  GET all events
  router.get("/", async (req, res) => {
    try {
      const events = await eventsCollection.find().toArray();
      res.send(events);
    } catch (err) {
      console.error("Error loading events:", err);
      res.status(500).send({ message: "Failed to load events" });
    }
  });

  //  GET single event by ID  (optional but useful)
  router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
      const event = await eventsCollection.findOne({ id });

      if (!event) {
        return res.status(404).send({ message: "Event not found" });
      }

      res.send(event);
    } catch (err) {
      console.error("Error loading event:", err);
      res.status(500).send({ message: "Failed to load event" });
    }
  });

  return router;
};
