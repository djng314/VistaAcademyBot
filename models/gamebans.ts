let mongoose = require("mongoose");
let Schema = new mongoose.Schema({


  RobloxUserID: Number,
  Reason: String,
  ModeratorUserID: Number

});
export default mongoose.model("VA_Bans", Schema)