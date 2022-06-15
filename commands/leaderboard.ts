import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Utility',
    description: "Display the top 10 merit holder",


    testOnly: true,
     
    slash: true,

    callback: async ({ message, interaction, args }) => {
        let datas = await merits.find().sort({'Merits':-1}).limit(10)
        let counter = 1
        let description='\n'
        for (const data of datas){
            let position = counter
            description+=`\n ${position}. ${await noblox.getUsernameFromId(data.RobloxUserID)}, ${data.Merits} Merits`
            counter+=1
        }
        interaction.reply({embeds:[
            await embedClass.infoEmbed('Merit Leaderboard',description)
        ]})
    }} as ICommand