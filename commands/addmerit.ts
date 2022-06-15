import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import merits from '../models/merits'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Utility',
    description: "Add merits to a user.",


    testOnly: true,
     
    slash: true,
    expectedArgs: '<roblox-user> <merits>',
    expectedArgsTypes: ['STRING','NUMBER'],


    callback: async ({ message, interaction, args }) => {
        let author = interaction.member as GuildMember
        let RobloxUsername = interaction.options.getString('roblox-user') || ''
        let meritNumber = interaction.options.getNumber('merits') || ''
        if(author.roles.cache.get('973310352936808468') || author.roles.cache.get('973310353591111730')){
            let UserID = await noblox.getIdFromUsername(RobloxUsername)
            if(meritNumber>0){
                let data = await merits.findOne({RobloxUserID:UserID})
                if(data){
                   await merits.findOneAndUpdate({RobloxUserID: UserID},{Merits: data.Merits+meritNumber})
                }else{
                    await merits.create({
                        RobloxUserID: UserID,
                        Merits: meritNumber
                    })
                } 
                
                let data2 = await merits.findOne({RobloxUserID:UserID})

                let newMerit = data2.Merits

                interaction.reply({embeds:[await embedClass.infoEmbed('Merit Updated Succesfully',`\n Roblox Username: ${RobloxUsername}\n Roblox ID: ${UserID} \n New Merit: ${newMerit}`)]})
            }else{
                interaction.reply({embeds:[await embedClass.errorEmbed('Invalid Input','Merits must be more than 0.')]})
            }


        }else{
            interaction.reply({embeds:[await embedClass.errorEmbed('Invalid Permission','You do not have the required permission to execute this command.')]})
        }
    }} as ICommand