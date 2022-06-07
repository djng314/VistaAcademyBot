import { CategoryChannel, GuildMember, GuildTextBasedChannel, InteractionCollector, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Utility',
    description: "Close a ticket",


    testOnly: true,

    slash: true,


    callback: async ({ message, interaction, args }) => {
        let channel = interaction.channel
        if (channel.parent.name === 'ticket'){
            channel.delete('Closing ticket')
        }else{
            interaction.reply({embeds:[await embedClass.errorEmbed('Error','You can only close a ticket channel.')]})
        }

    }
} as ICommand