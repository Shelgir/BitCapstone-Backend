import mongoose from "mongoose";

// schemay database, bo away bzanin chiw chi waragrin la user u ch data typekn
const schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  role: String,
  age: Number
});

// modelek la schemak drust akain bo trigger krdni functiony find u delete u awana
const Users = mongoose.model("Users", schema);

export default Users;
