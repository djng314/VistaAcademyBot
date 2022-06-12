"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const stream_1 = require("stream");
const util_1 = require("util");
const fetch = (url, init) => Promise.resolve().then(() => __importStar(require('node-fetch'))).then(({ default: fetch }) => fetch(url, init));
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
                        .setDescription('Upload the image as an attachment. ')
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
                        const download = ({ url, path }) => __awaiter(void 0, void 0, void 0, function* () {
                            const streamPipeline = (0, util_1.promisify)(stream_1.pipeline);
                            const response = yield fetch(url);
                            if (!response.ok) {
                                throw new Error(`unexpected response ${response.statusText}`);
                            }
                            yield streamPipeline(response.body, (0, fs_1.createWriteStream)(path));
                        });
                        (() => __awaiter(void 0, void 0, void 0, function* () {
                            try {
                                yield download({
                                    url: url,
                                    path: 'image.png',
                                });
                            }
                            catch (err) {
                                console.error(err);
                            }
                        }))();
                        console.log('Done!');
                        interaction.editReply({ embeds: [
                                yield embedClass.infoEmbed('Processing', 'Please give us a moment to process your image upload.')
                            ] });
                        let uploadData = yield noblox_js_1.default.uploadItem(itemName, 13, fs_2.default.createReadStream('image.png'), 6034265);
                        yield m.delete();
                        interaction.editReply({ embeds: [
                                yield embedClass.infoEmbed('Success!', `\n \n Asset ID: ${uploadData}`)
                            ] });
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
        else {
            interaction.reply({ embeds: [yield embedClass.errorEmbed('Invalid Permission', 'You do not have the permission to execute the following command.')] });
        }
    })
};
