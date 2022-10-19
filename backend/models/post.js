import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Post = Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  priority: {
    type: String,
    default: "high",
  },
});

export default mongoose.model("Post", Post);
