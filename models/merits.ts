import mongoose from "mongoose";

let Schema = new mongoose.Schema({


  RobloxUserID: Number,
  Merits: Number


});
export default mongoose.model("VA_Merits", Schema)