"use strict";
// module.exports = {}
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
    description: 'Deletes multiple messages at once.',
    requireRoles: true,
    maxArgs: 1,
    expectedArgs: '[amount]',
    slash: 'both',
    callback: ({ message, interaction, channel, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const amount = parseInt(interaction.options.getString("amount") || "0");
        if (message) {
            yield message.delete();
        }
        const { size } = yield channel.bulkDelete(amount, true);
        const reply = new discord_js_1.MessageEmbed()
            .setTitle("**Bulk Message Deleted**")
            .setDescription(` \n Deleted ${size} message(s).`)
            .setColor("WHITE")
            .setFooter({ text: "Vista Academy | Developed by Damien" });
        if (interaction) {
            return reply;
        }
        channel.send({ embeds: [reply] });
    }),
};
