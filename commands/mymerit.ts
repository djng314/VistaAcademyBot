import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Utility',
    description: "Display your merits from our database.",


    testOnly: true,
     
    slash: true,

    callback: async ({ message, interaction, args }) => {
        let target = interaction.member as GuildMember
        let RobloxUsername = target.displayName

        let RobloxID = await noblox.getIdFromUsername(RobloxUsername)

        if (RobloxID){
            let data = await merits.findOne({RobloxUserID: RobloxID})
            if(!data){
                interaction.reply({embeds:[await embedClass.infoEmbed('No data found','You do not have any existing merit record yet.')]})
                return
            }else{
                let numberMerits = `${data.Merits}`
                let description = `\n Roblox Username: ${RobloxUsername}\n Roblox ID: ${RobloxID} \n  Merits: ${numberMerits}`
                interaction.reply({embeds:[await embedClass.infoEmbed('Merits Info',description)]})
            }
        }else{
            interaction.reply({embeds:[await embedClass.errorEmbed('Invalid Data','Your server nickname MUST be your Roblox username.')]})
         
        }

    }} as ICommand