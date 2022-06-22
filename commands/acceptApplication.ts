import { GuildMember, Message, MessageEmbed, User } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import applications from '../models/applications'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Applications',
    description: "Accept an application",


    testOnly: true,

    slash: true,
    expectedArgs: '<applicaton-id>',
    expectedArgsTypes: ['STRING'],


    callback: async ({ message, interaction, args }) => {
        let author = interaction.member as GuildMember
        let applicationID = interaction.options.getString('applicaton-id') || ''

        interaction.reply({embeds: [ await embedClass.errorEmbed('Command not available','This command is still under development. Please await further announcement.')]})
        /*
        if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('975144760329269268')) {
            let data = await applications.findById(applicationID)
            if (data){

            }else{
                interaction.reply({embeds:[await embedClass.errorEmbed('Invalid ID','We did not find any application with that ID')]})
            }
        
        }else{
            interaction.reply({embeds:[await embedClass.errorEmbed('Invalid Permission','You do not have permission for this commmand')]})
        }*/
    }
} as ICommand