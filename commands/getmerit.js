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
    description: "Checks a user's merits.",
    testOnly: true,
    slash: true,
    expectedArgs: '<roblox-user>',
    expectedArgsTypes: ['STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        let RobloxUsername = interaction.options.getString('roblox-user') || '';
        let RobloxID = yield noblox_js_1.default.getIdFromUsername(RobloxUsername);
        if (RobloxID) {
            let data = yield merits_1.default.findOne({ RobloxUserID: RobloxID });
            if (data) {
                let numberMerits = `${data.Merits}`;
                let description = `\n Roblox Username: ${RobloxUsername}\n Roblox ID: ${RobloxID} \n  Merits: ${numberMerits}`;
                interaction.reply({ embeds: [yield embedClass.infoEmbed('Merits Info', description)] });
            }
            else {
                interaction.reply({ embeds: [yield embedClass.errorEmbed('No data', 'The user does not have any merit records.')] });
            }
        }
        else {
            interaction.reply({ embeds: [yield embedClass.errorEmbed('Invalid Input', 'Please make sure the Roblox user is valid.')] });
        }
    })
};
