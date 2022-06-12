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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'Moderation',
    description: 'Ban a user',
    requireRoles: true,
    testOnly: true,
    slash: 'both',
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const target = interaction.options.getMember('user');
        if (!target) {
            let noTagEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**No user provided**")
                .setDescription("Please tag the user you are trying to ban.")
                .setFooter({ text: "Vista Academy | Developed by Damien" })
                .setColor("RED");
            return noTagEmbed;
        }
        if (!target.bannable) {
            let CannotKickEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**Unable to ban**")
                .setDescription("You can't ban this user.")
                .setFooter({ text: "Vista Academy | Developed by Damien" })
                .setColor("RED");
            return CannotKickEmbed;
        }
        args.shift();
        const reason = args.join(' ');
        if (!reason) {
            let noReasonEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**No reason provided**")
                .setDescription("You can't ban this user without a valid reason.")
                .setFooter({ text: "Vista Academy | Developed by Damien" })
                .setColor("RED");
            return noReasonEmbed;
        }
        let DMembed = new discord_js_1.MessageEmbed()
            .setTitle("**Vista Academy Moderation**")
            .setDescription(`You have been banned from Vista Academy for ${reason}. \n \n Moderator: ${interaction.user.username}`)
            .setFooter({ text: "Vista Academy | Developed by Damien" })
            .setColor("ORANGE");
        try {
            yield target.send({ embeds: [DMembed] });
        }
        catch (error) {
            console.log(error);
            (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({
                embeds: [new discord_js_1.MessageEmbed()
                        .setTitle("Error DM'ing user")
                        .setDescription("The user had their DM's set to private. \n However, I will proceed to ban them.")
                        .setFooter({ text: "Vista Academy | Developed by Damien" })
                        .setColor("YELLOW")
                ]
            });
        }
        target.ban({ reason });
        let BanEmbed = new discord_js_1.MessageEmbed()
            .setTitle("**Banned Succesfully**")
            .setDescription(`${target.user.username} had been banned. \n \n **Reason: ** ${reason} \n **Moderator:** ${interaction.user.username}`)
            .setFooter({ text: "Vista Academy | Developed by Damien" })
            .setColor("DARK_PURPLE");
        let primaryGuild = interaction.guild;
        let action = 'Banned';
        let errorChannel = primaryGuild.channels.cache.get('973555709537042452');
        yield errorChannel.send({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(`**Member ${action}**`)
                    .setDescription(` \n ${target.user.username} had been ${action.toLowerCase()} from the server. \n **Moderator: ** <@${(_b = interaction.member) === null || _b === void 0 ? void 0 : _b.user.id}> \n **Reason: ** ${reason}`)
                    .setColor("RED")
                    .setFooter({ text: "Vista Academy | Developed by Damien" })
            ]
        });
        return BanEmbed;
    }),
};
