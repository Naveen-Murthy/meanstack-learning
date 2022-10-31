import express from "express";
import List from "../models/list";

const lists = express.Router();

lists.get("/lists", (req, res) => {
  List.find((err, lists) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "SUCCESS",
        data: lists,
      });
    }
  });
});

lists.get("/:id", (req, res) => {
  List.findById(req.params.id, (err, lists) => {
    if (err) {
      console.log(err);
    } else {
      res.json(lists);
    }
  });
});

lists.post("/add", (req, res) => {
  let list = new List(req.body);
  list
    .save()
    .then(() => {
      res.status(200).json({
        status: "SUCCESS",
        message: "List Added Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send("Failed to add a post");
    });
});

lists.post("/update/:id", (req, res) => {
  List.findById(req.params.id, (err, list) => {
    if (!list) {
      return next(new Error("Could not load document"));
    } else {
      list.title = req.body.title;
      list.desc = req.body.desc;
      list.priority = req.body.priority;

      list
        .save()
        .then(() => {
          res.status(200).json({
            status: "SUCCESS",
            message: "List Updated Successfully",
          });
        })
        .catch((err) => {
          res.status(400).send("Failed to update post");
        });
    }
  });
});

lists.get("/delete/:id", (req, res) => {
  List.findByIdAndRemove(req.params.id, (err, list) => {
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

export default lists;
