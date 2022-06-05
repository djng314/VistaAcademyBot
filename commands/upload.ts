import { Collector, GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Utility',
    description: "Upload teaching material to Roblox",


    testOnly: true,
     
    slash: true,
    expectedArgs: '<item-name>',
    expectedArgsTypes: ['STRING'],


    callback: async ({ message, interaction, args }) => {
      interaction.reply({embeds:[ 
          new MessageEmbed()
          .setTitle('Image Upload')
          .setDescription('Upload the image as an attachment. \n **Does not work yet** ')
          .setColor('AQUA')
          .setFooter({text:'Vista Academy | Developed by Damien'})
    ]})

    const filter = m => m.content.includes('discord');
    const channel = interaction.channel as TextChannel

    const collector = channel.createMessageCollector({ filter, max: 1 ,time: 15000 });
    collector.on('collect', m => {
        let attachment = m.attachments.first()
        let proxyURL = attachment.proxyURL
        let url = attachment.url
        console.log(`proxy url: ${proxyURL} | url: ${url}`)
        
    });
    
    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });
    }} as ICommand