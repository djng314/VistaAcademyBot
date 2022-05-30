import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import VABans from '../models/gamebans'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Moderation',
    description: "Unban a user from our games.",


    testOnly: true,
     
    slash: true,
    expectedArgs: '<roblox-user>',
    expectedArgsTypes: ['STRING'],


    callback: async ({ message, interaction, args }) => {
        let author = interaction.member as GuildMember
        if(author.roles.cache.get('973310352936808468') || author.roles.cache.get('973310353591111730')){
            let robloxUsername = interaction.options.getString('roblox-user') || ''
            let robloxUserID = await noblox.getIdFromUsername(robloxUsername)
           
            let data = await VABans.findOne({RobloxUserID:robloxUserID})
            if(data){
                
                let id = data._id
                console.log(id)
                await VABans.findByIdAndDelete(id)
                interaction.reply({embeds:[await embedClass.moderationEmbed(`${robloxUsername} had been unbanned`,`You have succesfully unbanned the user from all of our games.`)]})
            }else{
                interaction.reply({embeds:[await embedClass.errorEmbed(`${robloxUsername} has not been banned`,`No ban record found for the user.`)]})
            }

        }else{
            interaction.reply({embeds:[await embedClass.errorEmbed('Invalid Permission','You do not have the required permission to execute this command.')]})
        }
    }} as ICommand
           