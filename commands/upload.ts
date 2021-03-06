import { Collector, GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import embedsConstruct from '../functions/embedsConstruct'
import https from 'https'
import {createWriteStream} from 'fs';
import fs from 'fs';
import {pipeline} from 'stream';
import {promisify} from 'util';
import { RequestInfo, RequestInit } from 'node-fetch';

let embedClass = new embedsConstruct()

function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
}
export default {
    category: 'Utility',
    description: "Upload teaching material to Roblox",


    testOnly: true,

    slash: true,
    expectedArgs: '<item-name>',
    expectedArgsTypes: ['STRING'],


    callback: async ({ message, interaction, args }) => {
        let author = interaction.member as GuildMember
        let itemName = interaction.options.getString('item-name')
        //interaction.reply({embeds: [ await embedClass.errorEmbed('Command not available','This command is still under development. Please await further announcement.')]})
        if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('973310353591111730')) {
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

                        
                        const file = fs.createWriteStream("image.png");
                        const request =  https.get(proxyURL, function(response) {
                           response.pipe(file);
                        
                           // after download completed close filestream
                            file.on("finish", async() => {
                               file.close();
                               interaction.editReply({embeds:[
                                await embedClass.infoEmbed('Processing', 'Please give us a moment to process your image upload.')
                            ]})
                               console.log("Download Completed");
                           });
                        });
                  
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
        }

    }
} as ICommand