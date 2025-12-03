const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
    const db = client.db("techDB");

    console.log("Connected to DB:", db.databaseName);

    // Collections
    const techCollection = db.collection("techs");
    const eventsCollection = db.collection("events");
    const registrationCollection = db.collection("eventRegistrations");
    const usersCollection = db.collection("users"); 
    const trendsCollection = db.collection("trends");

    // Routes
    const eventsRoutes = require("./routes/events.routes")(eventsCollection);
    const techRoutes = require("./routes/tech.routes")(techCollection);
    const registrationRoutes = require("./routes/registrations.routes")(registrationCollection, eventsCollection);
    const userRoutes = require("./routes/users.routes")(usersCollection); 
    const trendsRoutes = require("./routes/trends.routes")(trendsCollection);

    // Mount
    app.use("/events", eventsRoutes);
    app.use("/techs", techRoutes);
    app.use("/event-registrations", registrationRoutes);
    app.use("/users", userRoutes); 
    app.use("/trends", trendsRoutes);

  } finally { }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Tech Portal Server is running...");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
