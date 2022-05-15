import discordJs, { DiscordAPIError, Guild, Intents, MessageEmbed, TextChannel } from "discord.js"
import dotenv from "dotenv"
import WOKCommands from "wokcommands"
import path from "path"
import noblox from "noblox.js"
import mongoose from "mongoose"




// const talkedRecently = new Set();
dotenv.config()

const client = new discordJs.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

client.on('ready', async () => {
    client.user?.setPresence({ activities: [{ name: 'to Vista Academy', type: "LISTENING" }], status: 'online' });
    console.log('The bot is online.')
    let primaryGuild = client.guilds.cache.get('973253184137076806') as Guild

    let errorChannel = primaryGuild.channels.cache.get('973555709537042452') as TextChannel
    errorChannel.send({
        embeds: [new MessageEmbed()
            .setTitle('The bot had been restarted.')
            .setColor('GOLD')
            .setTimestamp()
        ]
    })
    const currentUser = await noblox.setCookie(`${process.env["robloxcookie"]}`)
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
    const wok = new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: path.join(__dirname, 'commands'),
        testServers: ['973253184137076806'],
        // Pass in the new dbOptions
        // Pass in your own mongo connection URI
        // mongoUri: "mongodb+srv://cerezadiscord:Cereza314@cluster0.1gt3c.mongodb.net/test"
        mongoUri: process.env["dbLink"]

    })

})

var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
    console.log("Connection To MongoDB Atlas Successful!");
});



client.on('error', error => {
    let primaryGuild = client.guilds.cache.get('973253184137076806') as Guild

    let errorChannel = primaryGuild.channels.cache.get('973555709537042452') as TextChannel
    errorChannel.send({
        embeds: [new MessageEmbed()
            .setTitle(error.message)
            .setDescription(`${error}`)
            .setColor('RED')
            .setFooter({ text: 'Vista Academy | Developed by Damien' })
        ]
    })
    console.log('Error: ' + error)
    throw (error)
})






client.login(process.env.TOKEN)