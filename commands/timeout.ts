import ms from 'ms'
import { Guild, GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js'
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

                    let primaryGuild = interaction.guild as Guild
            let action = 'Timeout'
            let errorChannel = primaryGuild.channels.cache.get('973555709537042452') as TextChannel
            await errorChannel.send({
              embeds:[
                new MessageEmbed()
              .setTitle(`**Member ${action}**`)
              .setDescription(` \n ${targetMember.user.username} had been ${action.toLowerCase()} from the server for ${duration}. \n **Moderator: ** <@${interaction.member?.user.id}> \n **Reason: ** ${reason}`)
              .setColor("RED")
              .setFooter({text:"Vista Academy | Developed by Damien"})
              ]
            })

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