// module.exports = {}

import { Guild, MessageEmbed, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
  category: 'Moderation',
  description: 'Deletes multiple messages at once.',


  requireRoles: true,


  maxArgs: 1,
  expectedArgs: '[amount]',

  slash: 'both',


  callback: async ({ message, interaction, channel, args }) => {
  
    const amount = parseInt(interaction.options.getString("amount")|| "0")

    if (message) {
      await message.delete()
    }


    const { size } = await channel.bulkDelete(amount, true)

   
    const reply = new MessageEmbed()
    .setTitle("**Bulk Message Deleted**")
    .setDescription(` \n Deleted ${size} message(s).`)
    .setColor("WHITE")
    .setFooter({text:"Vista Academy | Developed by Damien"})

    if (interaction) {
      let primaryGuild = interaction.guild as Guild
      let errorChannel = primaryGuild.channels.cache.get('973555709537042452') as TextChannel
      await errorChannel.send({
        embeds:[
          new MessageEmbed()
        .setTitle("**Bulk Message Deleted**")
        .setDescription(` \n Deleted ${size} message(s). \n **Deleted by: ** <@${interaction.member?.user.id}> \n **Channel: ** <#${interaction.channel?.id}>`)
        .setColor("RED")
        .setFooter({text:"Vista Academy | Developed by Damien"})
        ]
      })
      return reply
    }

    

    channel.send({embeds: [reply]})
  },
} as ICommand
