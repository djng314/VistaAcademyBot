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
const discord_js_1 = require("discord.js");
const noblox_js_1 = __importDefault(require("noblox.js"));
const embedsConstruct_1 = __importDefault(require("../functions/embedsConstruct"));
var embedClass = new embedsConstruct_1.default();
exports.default = {
    category: 'Moderation',
    description: 'Rank a user on Roblox',
    requireRoles: true,
    testOnly: true,
    slash: true,
    minArgs: 2,
    expectedArgs: '<roblox-user> <rank>',
    expectedArgsTypes: ['STRING', 'STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var targetUsername = interaction.options.getString('roblox-user') || '';
        var rankToRank = interaction.options.getString('rank') || '';
        var RobloxID = yield noblox_js_1.default.getIdFromUsername(targetUsername);
        var RoleType;
        if (Number(rankToRank)) {
            RoleType = 'number';
        }
        else {
            RoleType = 'name';
        }
        if (RobloxID) {
            var originalRankInGroup = yield noblox_js_1.default.getRankInGroup(6034265, RobloxID);
            if (originalRankInGroup > 0) {
                try {
                    if (RoleType == 'name') {
                        let newRank = rankToRank;
                        yield noblox_js_1.default.setRank(6034265, RobloxID, newRank);
                    }
                    else {
                        let newRank = parseInt(rankToRank);
                        yield noblox_js_1.default.setRank(6034265, RobloxID, newRank);
                    }
                    let embed = yield embedClass.infoEmbed('Ranking Sucess', `${targetUsername} had been ranked succesfully.`);
                    interaction.reply({ embeds: [embed] });
                }
                catch (e) {
                    if (typeof e === "string") {
                        e.toUpperCase(); // works, `e` narrowed to string
                        console.log(e);
                        interaction.reply({
                            embeds: [new discord_js_1.MessageEmbed()
                                    .setTitle('Error')
                                    .setDescription(e)
                                    .setColor('RED')
                                    .setFooter({ text: 'Vista Academy | Developed by Damien' })
                            ]
                        });
                        throw (e);
                    }
                    else if (e instanceof Error) {
                        interaction.reply({
                            embeds: [new discord_js_1.MessageEmbed()
                                    .setTitle(e.name)
                                    .setDescription(e.message)
                                    .setColor('RED')
                                    .setFooter({ text: 'Vista Academy | Developed by Damien' })
                            ]
                        });
                        throw (e);
                    }
                }
            }
            else {
                let embed = yield embedClass.errorEmbed('User is not in group', `${targetUsername} is not in Vista Avademy. \n **Group link:** https://vistaacademy.xyz/roblox`);
                interaction.reply({ embeds: [embed] });
            }
        }
        else {
            let embed = yield embedClass.errorEmbed('User is not a valid Roblox user', `${targetUsername} is not found on Roblox.`);
            interaction.reply({ embeds: [embed] });
        }
    })
};
