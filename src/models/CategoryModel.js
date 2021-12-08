import mongoose from "mongoose";

// schemay database, bo away bzanin chiw chi waragrin la user u ch data typekn
const schema = new mongoose.Schema({
  name: String,
  description: String,
});

// modelek la schemak drust akain bo trigger krdni functiony find u delete u awana
const Category = mongoose.model("Category", schema);

export default Category;
