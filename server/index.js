import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => res.json("Hello to my App"));

app.get("/posts", postRoutes);

// MongoDB connection

const PORT = process.env.PORT || 4000;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.6lgeyf2.mongodb.net/blog?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("blog").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
