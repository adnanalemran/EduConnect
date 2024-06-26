const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const bodyParser = require("body-parser");
const bookstoreRoutes = require("../routes/bookstoreRoutes");

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fhwdeyh.mongodb.net/?retryWrites=true&w=majority`;

-mongoose.connect(uri, { dbName: process.env.DB_NAME });

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const port = process.env.PORT || 5000;

async function setup() {}

setup().then(() => {
  app.get("/", (req, res) => {
    res.send("server running...");
  });

  app.use("/api", bookstoreRoutes);

  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
