import mongoose from "mongoose";

let Schema = new mongoose.Schema({


  HostUserID: Number,
  Date: String,
  Time: String,


});
export default mongoose.model("VA_Sessions", Schema)