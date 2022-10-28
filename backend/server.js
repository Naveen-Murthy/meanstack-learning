import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Post from "./models/post";
import { config } from "./config/main-config";

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(config.env.mongoDBUri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mondo Db connection has been established successfully.");
});

router.route("/").get((req, res) => {
  Post.find((err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "SUCCESS",
        posts: posts,
      });
    }
  });
});

router.route("/:id").get((req, res) => {
  Post.findById(req.params.id, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.json(posts);
    }
  });
});

router.route("/add").post((req, res) => {
  let post = new Post(req.body);
  post
    .save()
    .then(() => {
      res.status(200).json({
        status: "SUCCESS",
        post: "Post Added Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send("Failed to add a post");
    });
});

router.route("/update/:id").post((req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (!post) {
      return next(new Error("Could not load document"));
    } else {
      post.title = req.body.title;
      post.desc = req.body.desc;
      post.visibility = req.body.visibility;

      post
        .save()
        .then(() => {
          res.status(200).json({
            status: "SUCCESS",
            message: "Post Updated Successfully",
          });
        })
        .catch((err) => {
          res.status(400).send("Failed to update post");
        });
    }
  });
});

router.route("/delete/:id").get((req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) {
      res.json(err);
    } else {
      res.status(200).json({
        status: "SUCCESS",
        message: "Deleted successfully",
      });
    }
  });
});

app.use("/posts", router);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(config.env.port, () => console.log("Express server  running on port" + config.env.port));
