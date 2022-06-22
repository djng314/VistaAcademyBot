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
const embedsConstruct_1 = __importDefault(require("../functions/embedsConstruct"));
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
        interaction.reply({ embeds: [yield embedClass.errorEmbed('Command not available', 'This command is still under development. Please await further announcement.')] });
        /*if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('973310353591111730')) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Image Upload')
                        .setDescription('Upload the image as an attachment. ')
                        .setColor('AQUA')
                        .setFooter({ text: 'Vista Academy | Developed by Damien' })
                ]
            })

            const filter = m => m.author.id == interaction.user.id;
            const channel = interaction.channel as TextChannel

            const collector = channel.createMessageCollector({ filter, max: 1, time: 30000 });
            collector.on('collect', async m => {
                let attachment = m.attachments.first()
                if (attachIsImage(attachment)) {
                    let proxyURL = attachment.proxyURL
                    let url = attachment.url
                    try {
                        const download = async ({url, path}) => {
                            const streamPipeline = promisify(pipeline);
                          
                            const response = await fetch(url);
                          
                            if (!response.ok) {
                              throw new Error(`unexpected response ${response.statusText}`);
                            }
                          
                            await streamPipeline(response.body, createWriteStream(path));
                          };
                          
                          (async () => {
                            try {
                              await download({
                                url: url,
                                path: 'image.png',
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          })();
                        console.log('Done!');
                    interaction.editReply({embeds:[
                        await embedClass.infoEmbed('Processing', 'Please give us a moment to process your image upload.')
                    ]})
                      let uploadData = await noblox.uploadItem(itemName,13,fs.createReadStream('image.png'),6034265)
                    await  m.delete()
                      interaction.editReply({embeds:[
                          await embedClass.infoEmbed('Success!',`\n \nAsset ID: ${uploadData}`)
                      ]})
                    } catch (e) {
                        if (typeof e === "string") {
                            e.toUpperCase() // works, `e` narrowed to string
                            console.log(e)
                            interaction.followUp({
                                embeds: [new MessageEmbed()
                                    .setTitle('Error')
                                    .setDescription(e)
                                    .setColor('RED')
                                    .setFooter({ text: 'Vista Academy | Developed by Damien' })
                                ]
                            })
                            throw (e)
                        } else if (e instanceof Error) {
                            interaction.followUp({embeds:[await embedClass.errorEmbed('Error',e.message)]})
                        }
                    }
                  
                    
                } else {
                    interaction.followUp({ embeds: [await embedClass.errorEmbed('Incorrect Format', 'Please make sure the image is a PNG format.')] })
                }

            });

            collector.on('end', async collected => {
                if (collected.size == 0){
                    interaction.followUp({embeds:[await embedClass.errorEmbed('Timeout','Please try again as the command had timed out.')]})
                }
            });
        }else{
            interaction.reply({embeds:[ await embedClass.errorEmbed('Invalid Permission','You do not have the permission to execute the following command.')]})
        }*/
    })
};
