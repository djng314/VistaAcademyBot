"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mongoose = require("mongoose");
let Schema = new mongoose.Schema({
    RobloxUserID: Number,
    Reason: String,
    ModeratorUserID: Number
});
exports.default = mongoose.model("VAGameWarns", Schema);
