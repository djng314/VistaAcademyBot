let mongoose = require("mongoose");
let Schema = new mongoose.Schema({


  Type: String,
  RobloxUserID: String,
  GroupID: String,
  Status: String,
  Date: String

});
export default mongoose.model("VA_Applications", Schema)