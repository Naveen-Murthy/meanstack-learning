import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ListSchema = Schema({
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

let List = mongoose.model("List", ListSchema);

export default List;