const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nxcjkte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const db = client.db("techDB");

    console.log("Connected to DB:", db.databaseName);

    // Collections
    const techCollection = db.collection("techs");
    const registrationCollection = db.collection("eventRegistrations");
    // const usersCollection = db.collection("users");
    const eventsCollection = db.collection("events");

    // Import Routes
    const eventsRoutes = require("./routes/events.routes")(eventsCollection);
    const techRoutes = require("./routes/tech.routes")(techCollection);
    // const userRoutes = require("./routes/users.routes")(usersCollection);
    const registrationRoutes = require("./routes/registrations.routes")(registrationCollection, eventsCollection);

    // Mount Routes
    app.use("/events", eventsRoutes);
    app.use("/techs", techRoutes);
    // app.use("/users", userRoutes);
    app.use("/event-registrations", registrationRoutes);

    // Ping test
    // await client.db("admin").command({ ping: 1 });
    // console.log("MongoDB connection OK ✔");
  } finally {
    // Keep server running
  }
}

run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("Tech Portal Server is running...");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
