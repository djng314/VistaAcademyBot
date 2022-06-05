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
const embedsConstruct_1 = __importDefault(require("../functions/embedsConstruct"));
let embedClass = new embedsConstruct_1.default();
exports.default = {
    category: 'Utility',
    description: "Upload teaching material to Roblox",
    testOnly: true,
    slash: true,
    expectedArgs: '<item-name>',
    expectedArgsTypes: ['STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        interaction.reply({ embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle('Image Upload')
                    .setDescription('Upload the image as an attachment. \n **Does not work yet** ')
                    .setColor('AQUA')
                    .setFooter({ text: 'Vista Academy | Developed by Damien' })
            ] });
        const filter = m => m.author.id == interaction.user.id;
        const channel = interaction.channel;
        const collector = channel.createMessageCollector({ filter, max: 1, time: 15000 });
        collector.on('collect', m => {
            let attachment = m.attachments.first();
            let proxyURL = attachment.proxyURL;
            let url = attachment.url;
            console.log(`proxy url: ${proxyURL} | url: ${url}`);
        });
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    })
};
