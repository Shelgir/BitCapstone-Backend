import mongoose from "mongoose";

// schemay database, bo away bzanin chiw chi waragrin la user u ch data typekn
const schema = new mongoose.Schema({
  email: String,
  total: Number,
  products: Array,
});

// modelek la schemak drust akain bo trigger krdni functiony find u delete u awana
const Orders = mongoose.model("Orders", schema);

export default Orders;
