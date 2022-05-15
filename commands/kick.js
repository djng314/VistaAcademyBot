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
    description: 'Kicks a user',
    requireRoles: true,
    testOnly: true,
    slash: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const target = interaction.options.getMember('user');
        console.log(target.nickname);
        if (!target) {
            let noTagEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**No user provided**")
                .setDescription("Please tag the user you are trying to kick.")
                .setFooter({ text: "Vista Academy | Developed by Damien" })
                .setColor("RED");
            return noTagEmbed;
        }
        if (!target.kickable) {
            let CannotKickEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**Unable to kick**")
                .setDescription("You can't kick this user.")
                .setFooter({ text: "Vista Academy | Developed by Damien" })
                .setColor("RED");
            return CannotKickEmbed;
        }
        args.shift();
        const reason = args.join(' ');
        if (!reason) {
            let noReasonEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**No reason provided**")
                .setDescription("You can't kick this user without a valid reason.")
                .setFooter({ text: "Vista Academy | Developed by Damien" })
                .setColor("RED");
            return noReasonEmbed;
        }
        let DMembed = new discord_js_1.MessageEmbed()
            .setTitle("**Vista Academy Moderation**")
            .setDescription(`You have been kicked from Vista Academy for ${reason}. \n \n Moderator: ${interaction.user.username}`)
            .setFooter({ text: "Vista Academy | Developed by Damien" })
            .setColor("ORANGE");
        /* try{
            await target.send({embeds: [DMembed]})
     
         }catch(error){
             console.log(error)
     
         }*/
        target.kick(reason);
        let KickEmbed = new discord_js_1.MessageEmbed()
            .setTitle("**Kicked Succesfully**")
            .setDescription(`${target.user.username} had been kicked. \n \n **Reason: ** ${reason} \n **Moderator:** ${interaction.user.username}`)
            .setFooter({ text: "Vista Academy | Developed by Damien" })
            .setColor("PURPLE");
        let primaryGuild = interaction.guild;
        let action = 'Kicked';
        let errorChannel = primaryGuild.channels.cache.get('973555709537042452');
        yield errorChannel.send({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(`**Member ${action}**`)
                    .setDescription(` \n ${target.user.username} had been ${action.toLowerCase()} from the server. \n **Moderator: ** <@${(_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user.id}> \n **Reason: ** ${reason}`)
                    .setColor("RED")
                    .setFooter({ text: "Vista Academy | Developed by Damien" })
            ]
        });
        return KickEmbed;
    }),
};
