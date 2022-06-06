import { Collector, GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import embedsConstruct from '../functions/embedsConstruct'

import fetch from 'node-fetch'
import fs from 'fs'
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
        if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('973310353591111730')) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Image Upload')
                        .setDescription('Upload the image as an attachment. \n **Does not work yet** ')
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
                      let uploadData = await noblox.uploadItem(itemName,13,fs.createReadStream(url),6034265)
                      let msg = `\n\n Asset ID: ${uploadData.id}`
                      interaction.followUp({embeds:[
                            
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
        }

    }
} as ICommand