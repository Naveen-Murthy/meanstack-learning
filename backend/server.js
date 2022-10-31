import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import lists from "./routes/lists";
import { config } from "./config/main-config";

const app = express();

// Port number
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(config.env.mongoDBUri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mondo Db connection has been established successfully.");
});

// Accessing users endpoints
app.use("/todos", lists);

// Index Route
app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
});

// To work on localhost:4000
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(config.env.port || port, () => console.log("Express server  running on port" + config.env.port));
