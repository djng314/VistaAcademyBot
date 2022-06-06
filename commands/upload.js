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
const fs_1 = __importDefault(require("fs"));
let embedClass = new embedsConstruct_1.default();
function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
}
exports.default = {
    category: 'Utility',
    description: "Upload teaching material to Roblox",
    testOnly: true,
    slash: true,
    expectedArgs: '<item-name>',
    expectedArgsTypes: ['STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        let author = interaction.member;
        let itemName = interaction.options.getString('item-name');
        if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('973310353591111730')) {
            interaction.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle('Image Upload')
                        .setDescription('Upload the image as an attachment. \n **Does not work yet** ')
                        .setColor('AQUA')
                        .setFooter({ text: 'Vista Academy | Developed by Damien' })
                ]
            });
            const filter = m => m.author.id == interaction.user.id;
            const channel = interaction.channel;
            const collector = channel.createMessageCollector({ filter, max: 1, time: 30000 });
            collector.on('collect', (m) => __awaiter(void 0, void 0, void 0, function* () {
                let attachment = m.attachments.first();
                if (attachIsImage(attachment)) {
                    let proxyURL = attachment.proxyURL;
                    let url = attachment.url;
                    try {
                        let uploadData = yield noblox_js_1.default.uploadItem(itemName, 13, fs_1.default.createReadStream(url), 6034265);
                        let msg = `\n\n Asset ID: ${uploadData.id}`;
                        interaction.followUp({ embeds: [] });
                    }
                    catch (e) {
                        if (typeof e === "string") {
                            e.toUpperCase(); // works, `e` narrowed to string
                            console.log(e);
                            interaction.followUp({
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
                            interaction.followUp({ embeds: [yield embedClass.errorEmbed('Error', e.message)] });
                        }
                    }
                }
                else {
                    interaction.followUp({ embeds: [yield embedClass.errorEmbed('Incorrect Format', 'Please make sure the image is a PNG format.')] });
                }
            }));
            collector.on('end', (collected) => __awaiter(void 0, void 0, void 0, function* () {
                if (collected.size == 0) {
                    interaction.followUp({ embeds: [yield embedClass.errorEmbed('Timeout', 'Please try again as the command had timed out.')] });
                }
            }));
        }
    })
};
