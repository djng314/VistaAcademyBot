import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import VABans from '../models/gamebans'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Moderation',
    description: "Ban a user from our games.",


    testOnly: true,
     
    slash: true,
    expectedArgs: '<roblox-user> <reason>',
    expectedArgsTypes: ['STRING','STRING'],


    callback: async ({ message, interaction, args }) => {
        let author = interaction.member as GuildMember
        if(author.roles.cache.get('973310352936808468') || author.roles.cache.get('973310353591111730')){
            let robloxUsername = interaction.options.getString('roblox-user') || ''
            let robloxUserID = await noblox.getIdFromUsername(robloxUsername)
            let reason = interaction.options.getString('reason')
            let moderator = interaction.member as GuildMember
            let moderatorUsername = moderator.displayName
            let moderatorUserID = await noblox.getIdFromUsername(moderatorUsername)
            let data = await VABans.findOne({RobloxUserID:robloxUserID})
            if(data){
                interaction.reply({embeds:[await embedClass.errorEmbed(`${robloxUsername} already had been banned`,`**Ban log: ** \nReason: ${data.reason}\nModerator: ${await noblox.getUsernameFromId(Number(data.ModeratorUserID))}`)]})
            }else{
               await  VABans.create({
                RobloxUserID: robloxUserID,
                Reason: reason,
                ModeratorUserID: moderatorUserID 
                })
                interaction.reply({embeds:[await embedClass.moderationEmbed(`${robloxUsername} had been banned`,`**Action Details: **\nReason: ${reason}\nModerator: ${moderatorUsername}`)]})
            }

        }else{
            interaction.reply({embeds:[await embedClass.errorEmbed('Invalid Permission','You do not have the required permission to execute this command.')]})
        }
    }} as ICommand
           