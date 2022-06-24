import { GuildMember, Message, MessageEmbed, User } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from 'noblox.js'
import applications from '../models/applications'
import embedsConstruct from '../functions/embedsConstruct'

let embedClass = new embedsConstruct()

export default {
    category: 'Applications',
    description: "Deny an application",


    testOnly: true,

    slash: true,
    expectedArgs: '<applicaton-id>',
    expectedArgsTypes: ['STRING'],


    callback: async ({ message, interaction, args }) => {
        let author = interaction.member as GuildMember
        let applicationID = interaction.options.getString('applicaton-id') || ''


        if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('975144760329269268')) {
            try {
                let data = await applications.findById(applicationID)
                interaction.reply({ embeds: [await embedClass.infoEmbed('Invalid ID', 'We did not find any application with that ID')] })
                if (data) {
                    await applications.findByIdAndUpdate(applicationID, { Status: 'Denied' })
                    interaction.reply({ embeds: [await embedClass.infoEmbed('Denied Application', 'We have denied the application.')] })
                } else {
                    interaction.reply({ embeds: [await embedClass.errorEmbed('Invalid ID', 'We did not find any application with that ID')] })
                }
            } catch (e) {
                if (typeof e === "string") {
                    e.toUpperCase() // works, `e` narrowed to string
                    console.log(e)
                    interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('Error')
                            .setDescription('Invalid ID')
                            .setColor('RED')
                            .setFooter({ text: 'Vista Academy | Developed by Damien' })
                        ]
                    })
                    throw (e)
                    return
                } else if (e instanceof Error) {
                    interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle('Error')
                            .setDescription('Invalid ID')
                            .setColor('RED')
                            .setFooter({ text: 'Vista Academy | Developed by Damien' })
                        ]
                    })
                    throw (e)
                }
            }
        } else {
            interaction.reply({ embeds: [await embedClass.errorEmbed('Invalid Permission', 'You do not have permission for this commmand')] })
        }
    }
} as ICommand