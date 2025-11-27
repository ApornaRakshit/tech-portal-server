const express = require("express");
const router = express.Router();

module.exports = function (registrationCollection, eventsCollection) {
  // ⭐ Save registration safely
  router.post("/", async (req, res) => {
    const registration = req.body;

    try {
      // 1️⃣ Check duplicate registration
      const exists = await registrationCollection.findOne({
        email: registration.email,
        eventId: registration.eventId,
      });

      if (exists) {
        return res.send({
          insertedId: null,
          message: "User already registered",
        });
      }

      // 2️⃣ Insert new registration
      const result = await registrationCollection.insertOne(registration);

      // 3️⃣ Increase event count ONLY ONCE
      await eventsCollection.updateOne(
        { id: Number(registration.eventId) },
        { $inc: { registeredCount: 1 } }
      );

      return res.send(result);

    } catch (err) {
      console.error("❌ Registration route error:", err);
      res.status(500).send({ message: "Failed to register user" });
    }
  });

  // Get all registrations
  router.get("/", async (req, res) => {
    const registrations = await registrationCollection.find().toArray();
    res.send(registrations);
  });

  return router;
};
