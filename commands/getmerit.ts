import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Utility',
    description: "Checks a user's merits.",


    testOnly: true,
     
    slash: true,
    expectedArgs: '<roblox-user>',
    expectedArgsTypes: ['STRING'],


    callback: async ({ message, interaction, args }) => {

        let RobloxUsername = interaction.options.getString('roblox-user') || ''
        let RobloxID = await noblox.getIdFromUsername(RobloxUsername)

        if(RobloxID){
            let data = await merits.findOne({RobloxUserID: RobloxID})
            if(data){
                let numberMerits = `${data.Merits}`
                let description = `\n Roblox Username: ${RobloxUsername}\n Roblox ID: ${RobloxID} \n  Merits: ${numberMerits}`
                interaction.reply({embeds:[await embedClass.infoEmbed('Merits Info',description)]})
            }else{
                interaction.reply({embeds:[await embedClass.errorEmbed('No data','The user does not have any merit records.')]})
            }
        }else{
            interaction.reply({embeds:[await embedClass.errorEmbed('Invalid Input','Please make sure the Roblox user is valid.')]})
        }



    }} as ICommand