import discordJS, { MessageEmbed } from 'discord.js'

const footerText = 'Vista Academy | Developed by Damien'
class embedsCreate{

    async infoEmbed(title:string,description:string){
        let embedToReturn = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor('BLUE')
        .setFooter({text: footerText})
    return embedToReturn
    }

    async errorEmbed(title:string,description:string){
        let embedToReturn = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor('RED')
        .setFooter({text: footerText})
    return embedToReturn
    }

    async moderationEmbed(title:string,description:string){
        let embedToReturn = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor('ORANGE')
        .setFooter({text: footerText})
    return embedToReturn
    }

    async embedLog(title:string,description:string){
        let embedToReturn = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor('NOT_QUITE_BLACK')
        .setFooter({text: footerText})
    return embedToReturn
    }


}

export default embedsCreate