import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Post from "./models/post";

const app = express();
const router = express.Router();
app.get("/", (req, res) => res.send("Hello World!"));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/posts");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mondo Db connection has been established successfully.");
});

router.route("/posts").get((req, res) => {
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

router.route("/posts/:id").get((req, res) => {
  Post.findById(req.params.id, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.json(posts);
    }
  });
});

router.route("/posts/add").post((req, res) => {
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

router.route("/posts/update/:id").post((req, res, next) => {
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

router.route("/posts/delete/:id").get((req, res) => {
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

app.use("/", router);

app.listen(4000, () => console.log("Express server  running on port 4000"));
