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
    description: "Add merits to a user.",
    testOnly: true,
    slash: true,
    expectedArgs: '<roblox-user> <merits>',
    expectedArgsTypes: ['STRING', 'NUMBER'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        let author = interaction.member;
        let RobloxUsername = interaction.options.getString('roblox-user') || '';
        let meritNumber = interaction.options.getNumber('merits') || '';
        if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('973310353591111730')) {
            let UserID = yield noblox_js_1.default.getIdFromUsername(RobloxUsername);
            let author = interaction.member;
            let AuthorRobloxUserID = yield noblox_js_1.default.getIdFromUsername(author.displayName);
            if (AuthorRobloxUserID == UserID) {
                interaction.reply({ embeds: [yield embedClass.errorEmbed("Invalid Operation", "Can't edit your own merit amount")] });
                return;
            }
            if (meritNumber > 0 && meritNumber < 100) {
                let data = yield merits_1.default.findOne({ RobloxUserID: UserID });
                if (data) {
                    yield merits_1.default.findOneAndUpdate({ RobloxUserID: UserID }, { Merits: data.Merits + meritNumber });
                }
                else {
                    yield merits_1.default.create({
                        RobloxUserID: UserID,
                        Merits: meritNumber
                    });
                }
                let data2 = yield merits_1.default.findOne({ RobloxUserID: UserID });
                let newMerit = data2.Merits;
                interaction.reply({ embeds: [yield embedClass.infoEmbed('Merit Updated Succesfully', `\n Roblox Username: ${RobloxUsername}\n Roblox ID: ${UserID} \n New Merit: ${newMerit}`)] });
            }
            else {
                interaction.reply({ embeds: [yield embedClass.errorEmbed('Invalid Input', 'Merits must be more than 0 and less than 100.')] });
            }
        }
        else {
            interaction.reply({ embeds: [yield embedClass.errorEmbed('Invalid Permission', 'You do not have the required permission to execute this command.')] });
        }
    })
};
