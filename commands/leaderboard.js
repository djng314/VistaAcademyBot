"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const noblox_js_1 = __importDefault(require("noblox.js"));
const merits_1 = __importDefault(require("../models/merits"));
const embedsConstruct_1 = __importDefault(require("../functions/embedsConstruct"));
let embedClass = new embedsConstruct_1.default();
exports.default = {
    category: 'Utility',
    description: "Display the top 10 merit holder",
    testOnly: true,
    slash: true,
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        let datas = yield merits_1.default.find().sort({ 'Merits': -1 }).limit(10);
        let counter = 1;
        let description = '\n';
        for (const data of datas) {
            let position = counter;
            description += `\n ${position}. ${yield noblox_js_1.default.getUsernameFromId(data.RobloxUserID)}, ${data.Merits} Merits`;
            counter += 1;
        }
        interaction.reply({ embeds: [
                yield embedClass.infoEmbed('Merit Leaderboard', description)
            ] });
    })
};
