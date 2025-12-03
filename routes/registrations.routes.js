const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb"); // Needed to delete by _id

module.exports = function (registrationCollection, eventsCollection) {

  //  Save registration safely
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

      //  Insert new registration
      const result = await registrationCollection.insertOne(registration);

      //  Increase event count
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

  //  Cancel/Delete registration by ID (Step 2 → decrease registeredCount)
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
      // 1️⃣ Find the registration first
      const registration = await registrationCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!registration) {
        return res.status(404).send({ message: "Registration not found" });
      }

      //  Delete registration
      const result = await registrationCollection.deleteOne({
        _id: new ObjectId(id),
      });

      //  Decrease event registeredCount
      await eventsCollection.updateOne(
        { id: Number(registration.eventId) },
        { $inc: { registeredCount: -1 } }
      );

      return res.send({ success: true });

    } catch (err) {
      console.error("❌ Delete registration error:", err);
      res.status(500).send({ message: "Failed to cancel registration" });
    }
  });

  //  GET registrations for a specific user
  router.get("/:email", async (req, res) => {
    const email = req.params.email;

    try {
      const saved = await registrationCollection.find({ email }).toArray();
      res.send(saved);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Failed to load saved events" });
    }
  });

  //  GET all registrations (admin)
  router.get("/", async (req, res) => {
    const registrations = await registrationCollection.find().toArray();
    res.send(registrations);
  });

  return router;
};
