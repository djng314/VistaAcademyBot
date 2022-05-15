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
const ms_1 = __importDefault(require("ms"));
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'Moderation',
    description: 'Timeout a user',
    requireRoles: true,
    testOnly: true,
    slash: 'both',
    minArgs: 2,
    expectedArgs: '<user> <length> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let duration = (0, ms_1.default)(interaction.options.getString('length') || '1h');
        let targetMember = interaction.options.getMember('user');
        let reason = interaction.options.getString('reason');
        if (!targetMember) {
            interaction.reply({ content: 'Please mention a member.', ephemeral: true });
        }
        else {
            if (!duration) {
                interaction.reply({ content: 'Please mention a duration.', ephemeral: true });
            }
            else {
                if (!reason) {
                    interaction.reply({ content: 'Please  provide a reason.', ephemeral: true });
                }
                else {
                    targetMember.timeout(duration, reason);
                    let primaryGuild = interaction.guild;
                    let action = 'Timeout';
                    let errorChannel = primaryGuild.channels.cache.get('973555709537042452');
                    yield errorChannel.send({
                        embeds: [
                            new discord_js_1.MessageEmbed()
                                .setTitle(`**Member ${action}**`)
                                .setDescription(` \n ${targetMember.user.username} had been ${action.toLowerCase()} from the server for ${duration}. \n **Moderator: ** <@${(_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user.id}> \n **Reason: ** ${reason}`)
                                .setColor("RED")
                                .setFooter({ text: "Vista Academy | Developed by Damien" })
                        ]
                    });
                    interaction.reply({ embeds: [new discord_js_1.MessageEmbed()
                                .setTitle('User Timeout')
                                .setDescription(`${targetMember.nickname} had been timeout.`)
                                .setColor('PURPLE')
                                .setFooter({ text: 'Vista Academy | Developed by Damien' })
                        ] });
                }
            }
        }
    }),
};
