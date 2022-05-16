import { Guild, GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import embedsConstruct from '../functions/embedsConstruct'

var embedClass = new embedsConstruct()
export default {
    category: 'Moderation',
    description: 'Rank a user on Roblox',

    requireRoles: true,

    testOnly: true,

    slash: true,


    minArgs: 2,
    expectedArgs: '<roblox-user> <rank>',
    expectedArgsTypes: ['STRING', 'STRING'],

    callback: async({ message, interaction, args }) => {
        var targetUsername:string = interaction.options.getString('roblox-user') || ''
        var rankToRank:string = interaction.options.getString('rank') || '' 
        var RobloxID = await noblox.getIdFromUsername(targetUsername)

        var RoleType:string;

        if(Number(rankToRank)){
            RoleType = 'number'
        }else{
            RoleType = 'name'
        }
        if(RobloxID){
            var originalRankInGroup = await noblox.getRankInGroup(6034265, RobloxID)

            if(originalRankInGroup >0 ){
                try {
                    if(RoleType == 'name'){
                        let newRank = rankToRank
                        await noblox.setRank(6034265,RobloxID,newRank)
                    }else{
                        let newRank = parseInt(rankToRank)
                        await noblox.setRank(6034265,RobloxID,newRank)
                    }
                    let  embed = await embedClass.infoEmbed('Ranking Sucess',`${targetUsername} had been ranked succesfully.`)
                    interaction.reply({embeds: [embed]})
                } catch (e) {
                    if (typeof e === "string") {
                        e.toUpperCase() // works, `e` narrowed to string
                        console.log(e)
                        interaction.reply({
                            embeds: [new MessageEmbed()
                                .setTitle('Error')
                                .setDescription(e)
                                .setColor('RED')
                                .setFooter({ text: 'Vista Academy | Developed by Damien' })
                            ]
                        })
                        throw (e)
                    } else if (e instanceof Error) {
                        interaction.reply({
                            embeds: [new MessageEmbed()
                                .setTitle(e.name)
                                .setDescription(e.message)
                                .setColor('RED')
                                .setFooter({ text: 'Vista Academy | Developed by Damien' })
                            ]
                        })
                        throw (e)
                    }
                }
            }else{
                let  embed = await embedClass.errorEmbed('User is not in group',`${targetUsername} is not in Vista Avademy. \n **Group link:** https://vistaacademy.xyz/roblox`)
                interaction.reply({embeds: [embed]})
            }
        }else{
            let  embed = await embedClass.errorEmbed('User is not a valid Roblox user',`${targetUsername} is not found on Roblox.`)
                interaction.reply({embeds: [embed]})
        }
    }
}as ICommand

    