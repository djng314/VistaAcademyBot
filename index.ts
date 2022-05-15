import discordJs, { DiscordAPIError, Guild, Intents, MessageEmbed, TextChannel } from "discord.js"
import dotenv from "dotenv"
import WOKCommands from "wokcommands"
import path from "path"
import noblox from "noblox.js"
import mongoose from "mongoose"
import merits from "./models/merits"



const talkedRecently = new Set();
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
            .setTitle('Notification')
            .setDescription('The bot had just been restarted.')
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

client.on('messageCreate',async(message)=>{
    if(message.content.length >5){
      
      if(message.member){
        if(talkedRecently.has(message.author.id)){
          console.log("On cool down")
        }else{
          talkedRecently.add(message.author.id);
          
          var RobloxUsername = message.member.displayName
          var RobloxID = await noblox.getIdFromUsername(RobloxUsername)

          if(RobloxID){
            let data = await merits.findOne({RobloxUserID: RobloxID})
            if(data){
                await merits.findOneAndUpdate({RobloxUserID: RobloxID},{Merits:parseInt(data.Merits)+1})
            }else{
                await merits.create({
                    RobloxUserID: RobloxID,
                    Merits: 1
                })
            }
          }
           
          setTimeout(() => {
            talkedRecently.delete(message.author.id);
            console.log("Deleted cooldown")
          }, 240000);
        }
    }
}})

client.on('messageDelete', message => {
	console.log(`A message by ${message.member?.user.username} was deleted, but we don't know by who yet.`);
    let primaryGuild = client.guilds.cache.get('973253184137076806') as Guild
    let channel = message.channel as TextChannel
    let channelName = channel.name
    let errorChannel = primaryGuild.channels.cache.get('973555709537042452') as TextChannel
    errorChannel.send({
        embeds: [new MessageEmbed()
            .setTitle('Message Deleted')
            .setDescription(`A message by ${message.member?.user.username} also known as ${message.member?.displayName} (<@${message.member?.id}>) was deleted in ${channelName} (<#${channel.id}>). \n\n ** Message Content: ** ${message.content}`)
            .setColor('RED')
            .setFooter({text: 'Vista Academy | Developed by Damien'})
            .setTimestamp()
        ]
    })

});



client.login(process.env.TOKEN)