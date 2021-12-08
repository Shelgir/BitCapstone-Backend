import mongoose from "mongoose";

// schemay database, bo away bzanin chiw chi waragrin la user u ch data typekn
const schema = new mongoose.Schema({
  id: String,
  name: String,
  price: 0,
  description: String,
  category: String,
  image: String,
  quantity: 0,
});

// modelek la schemak drust akain bo trigger krdni functiony find u delete u awana
const Product = mongoose.model("Product", schema);

export default Product;
