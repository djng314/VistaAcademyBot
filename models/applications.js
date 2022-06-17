"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mongoose = require("mongoose");
let Schema = new mongoose.Schema({
    Type: String,
    RobloxUserID: String,
    GroupID: String,
    Status: String,
    Date: String
});
exports.default = mongoose.model("VA_Applications", Schema);
