import { CategoryChannel, GuildMember, GuildTextBasedChannel, InteractionCollector, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Utility',
    description: "Create a new ticket",


    testOnly: true,

    slash: true,
    expectedArgs: '<reason>',
    expectedArgsTypes: ['STRING'],

    callback: async ({ message, interaction, args }) => {
        let reason = interaction.options.getString('reason')
        let author = interaction.member as GuildMember
        let cate = interaction.guild.channels.cache.find(
            (c) => c.name.toLowerCase() === "tickets" && c.type === "GUILD_CATEGORY") as CategoryChannel
        if (!cate) return interaction.reply({ ephemeral: true, content: 'No such category is found.' })
        let existingTicket = interaction.guild.channels.cache.find((exist) => exist.name.toLowerCase() === author.displayName.toLowerCase())
        if (!existingTicket) {
            let channel = await interaction.guild.channels.create(`${author.displayName}`, {
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL"],

                    },
                    {
                        id: '973310352936808468',
                        allow: ["VIEW_CHANNEL"],
                    },
                    {
                        id: '973310353591111730',
                        allow: ["VIEW_CHANNEL"],
                    },
                ],
            }).then(channell => channell.setParent(cate))
        interaction.reply({embeds:[ await embedClass.infoEmbed('Ticket created',`\n Your ticket is at <#${channel.id}>. One of our staff member will be with you shortly.`)],ephemeral:true})
       await channel.send({content:'@everyone'})
        await channel.send({embeds:[ new MessageEmbed()
            .setTitle(`${author.displayName} had created a ticket.`)
            .setDescription(`Reason: ${reason}`)
            .setFooter({text:'Vista Academy | Developed by Damien'})
            .setColor('AQUA')
            ]})
    } else {
            interaction.reply({ embeds: [await embedClass.errorEmbed('Already have an existing ticket', 'You already have an existing ticket.')] })
        }

    }
} as ICommand