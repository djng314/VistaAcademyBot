import ms from 'ms'
import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Timeout a user',

    requireRoles: true,

    testOnly: true,
     
    slash: 'both',


    minArgs: 2,
    expectedArgs: '<user> <length> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],

    callback: async ({ message, interaction, args }) => {
        let duration = ms(interaction.options.getString('length') || '1h')
        let targetMember = interaction.options.getMember('user') as GuildMember
        let reason = interaction.options.getString('reason')
        if (!targetMember) {
 

            interaction.reply({content:'Please mention a member.' , ephemeral: true})
        } else {
            if (!duration) {
                interaction.reply({content:'Please mention a duration.' , ephemeral: true})
            } else {
                if (!reason) {
                    interaction.reply({content:'Please  provide a reason.' , ephemeral: true})
                } else {
                    targetMember.timeout(duration, reason)
                    interaction.reply({embeds:[new MessageEmbed()
                    .setTitle('User Timeout')
                    .setDescription(`${targetMember.nickname} had been timeout.`)
                    .setColor('PURPLE')
                    .setFooter({text:'Vista Academy | Developed by Damien'})
                ]})
                }
            }
        }
    },
} as ICommand