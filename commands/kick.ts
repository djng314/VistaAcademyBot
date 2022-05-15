

import { Guild, GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Kicks a user',

    requireRoles: true,
    testOnly: true,
     

    slash: true,


    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, interaction, args }) => {
        const target = interaction.options.getMember('user') as GuildMember

        console.log(target.nickname)

        if (!target) {
            let noTagEmbed = new MessageEmbed()
                .setTitle("**No user provided**")
                .setDescription("Please tag the user you are trying to kick.")
                .setFooter({text:"Vista Academy | Developed by Damien"})
                .setColor("RED")



            return noTagEmbed
        }



        if (!target.kickable) {
            let CannotKickEmbed = new MessageEmbed()
                .setTitle("**Unable to kick**")
                .setDescription("You can't kick this user.")
                .setFooter({text:"Vista Academy | Developed by Damien"})
                .setColor("RED")



            return CannotKickEmbed
        }


        args.shift()
        const reason = args.join(' ')

        if (!reason) {
            let noReasonEmbed = new MessageEmbed()
                .setTitle("**No reason provided**")
                .setDescription("You can't kick this user without a valid reason.")
                .setFooter({text:"Vista Academy | Developed by Damien"})
                .setColor("RED")



            return noReasonEmbed

        }

        let DMembed = new MessageEmbed()
            .setTitle("**Vista Academy Moderation**")
            .setDescription(`You have been kicked from Vista Academy for ${reason}. \n \n Moderator: ${interaction.user.username}`)
            .setFooter({text:"Vista Academy | Developed by Damien"})
            .setColor("ORANGE")

        /* try{
            await target.send({embeds: [DMembed]})
     
         }catch(error){
             console.log(error)
     
         }*/


        target.kick(reason)

        let KickEmbed = new MessageEmbed()
            .setTitle("**Kicked Succesfully**")
            .setDescription(`${target.user.username} had been kicked. \n \n **Reason: ** ${reason} \n **Moderator:** ${interaction.user.username}`)
            .setFooter({text:"Vista Academy | Developed by Damien"})
            .setColor("PURPLE")

            let primaryGuild = interaction.guild as Guild
            let action = 'Kicked'
            let errorChannel = primaryGuild.channels.cache.get('973555709537042452') as TextChannel
            await errorChannel.send({
              embeds:[
                new MessageEmbed()
              .setTitle(`**Member ${action}**`)
              .setDescription(` \n ${target.user.username} had been ${action.toLowerCase()} from the server. \n **Moderator: ** <@${interaction.member?.user.id}> \n **Reason: ** ${reason}`)
              .setColor("RED")
              .setFooter({text:"Vista Academy | Developed by Damien"})
              ]
            })
        
            return KickEmbed
         


    },
} as ICommand
