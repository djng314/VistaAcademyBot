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
const gamebans_1 = __importDefault(require("../models/gamebans"));
const embedsConstruct_1 = __importDefault(require("../functions/embedsConstruct"));
let embedClass = new embedsConstruct_1.default();
exports.default = {
    category: 'Moderation',
    description: "Ban a user from our games.",
    testOnly: true,
    slash: true,
    expectedArgs: '<roblox-user> <reason>',
    expectedArgsTypes: ['STRING', 'STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        let author = interaction.member;
        if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('973310353591111730')) {
            let robloxUsername = interaction.options.getString('roblox-user') || '';
            let robloxUserID = yield noblox_js_1.default.getIdFromUsername(robloxUsername);
            let reason = interaction.options.getString('reason');
            let moderator = interaction.member;
            let moderatorUsername = moderator.displayName;
            let moderatorUserID = yield noblox_js_1.default.getIdFromUsername(moderatorUsername);
            let data = yield gamebans_1.default.findOne({ RobloxUserID: robloxUserID });
            if (data) {
                interaction.reply({ embeds: [yield embedClass.errorEmbed(`${robloxUsername} already had been banned`, `**Ban log: ** \nReason: ${data.Reason}\nModerator: ${yield noblox_js_1.default.getUsernameFromId(Number(data.ModeratorUserID))}`)] });
            }
            else {
                yield gamebans_1.default.create({
                    RobloxUserID: robloxUserID,
                    Reason: reason,
                    ModeratorUserID: moderatorUserID
                });
                interaction.reply({ embeds: [yield embedClass.moderationEmbed(`${robloxUsername} had been banned`, `**Action Details: **\nReason: ${reason}\nModerator: ${moderatorUsername}`)] });
            }
        }
        else {
            interaction.reply({ embeds: [yield embedClass.errorEmbed('Invalid Permission', 'You do not have the required permission to execute this command.')] });
        }
    })
};
