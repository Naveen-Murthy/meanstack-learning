import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Post = Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  visibility: {
    type: String,
    default: "Public",
  },
});

export default mongoose.model("Post", Post);
