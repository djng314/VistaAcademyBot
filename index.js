"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const wokcommands_1 = __importDefault(require("wokcommands"));
const path_1 = __importDefault(require("path"));
const noblox_js_1 = __importDefault(require("noblox.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const merits_1 = __importDefault(require("./models/merits"));
const talkedRecently = new Set();
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_PRESENCES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({ activities: [{ name: 'to Vista Academy', type: "LISTENING" }], status: 'online' });
    console.log('The bot is online.');
    let primaryGuild = client.guilds.cache.get('973253184137076806');
    let errorChannel = primaryGuild.channels.cache.get('973555709537042452');
    errorChannel.send({
        embeds: [new discord_js_1.MessageEmbed()
                .setTitle('Notification')
                .setDescription('The bot had just been restarted.')
                .setColor('GOLD')
                .setTimestamp()
        ]
    });
    const currentUser = yield noblox_js_1.default.setCookie(`${process.env["robloxcookie"]}`);
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`);
    const wok = new wokcommands_1.default(client, {
        // The name of the local folder for your command files
        commandsDir: path_1.default.join(__dirname, 'commands'),
        testServers: ['973253184137076806'],
        // Pass in the new dbOptions
        // Pass in your own mongo connection URI
        // mongoUri: "mongodb+srv://cerezadiscord:Cereza314@cluster0.1gt3c.mongodb.net/test"
        mongoUri: process.env["dbLink"]
    });
}));
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connection To MongoDB Atlas Successful!");
});
client.on('error', error => {
    let primaryGuild = client.guilds.cache.get('973253184137076806');
    let errorChannel = primaryGuild.channels.cache.get('973555709537042452');
    errorChannel.send({
        embeds: [new discord_js_1.MessageEmbed()
                .setTitle(error.message)
                .setDescription(`${error}`)
                .setColor('RED')
                .setFooter({ text: 'Vista Academy | Developed by Damien' })
        ]
    });
    console.log('Error: ' + error);
    throw (error);
});
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.content.length > 5) {
        if (message.member) {
            if (talkedRecently.has(message.author.id)) {
                console.log("On cool down");
            }
            else {
                talkedRecently.add(message.author.id);
                var RobloxUsername = message.member.displayName;
                var RobloxID = yield noblox_js_1.default.getIdFromUsername(RobloxUsername);
                if (RobloxID) {
                    let data = yield merits_1.default.findOne({ RobloxUserID: RobloxID });
                    if (data) {
                        yield merits_1.default.findOneAndUpdate({ RobloxUserID: RobloxID }, { Merits: parseInt(data.Merits) + 1 });
                    }
                    else {
                        yield merits_1.default.create({
                            RobloxUserID: RobloxID,
                            Merits: 1
                        });
                    }
                }
                setTimeout(() => {
                    talkedRecently.delete(message.author.id);
                    console.log("Deleted cooldown");
                }, 240000);
            }
        }
    }
}));
client.on('messageDelete', message => {
    var _a, _b, _c;
    console.log(`A message by ${(_a = message.member) === null || _a === void 0 ? void 0 : _a.user.username} was deleted, but we don't know by who yet.`);
    let primaryGuild = client.guilds.cache.get('973253184137076806');
    let channel = message.channel;
    let channelName = channel.name;
    let errorChannel = primaryGuild.channels.cache.get('973555709537042452');
    errorChannel.send({
        embeds: [new discord_js_1.MessageEmbed()
                .setTitle('Message Deleted')
                .setDescription(`A message by ${(_b = message.member) === null || _b === void 0 ? void 0 : _b.user.username} also known as ${(_c = message.member) === null || _c === void 0 ? void 0 : _c.displayName} was deleted in ${channelName} (<#${channel.id}>). \n\n ** Message Content: ** ${message.content}`)
                .setColor('RED')
                .setFooter({ text: 'Vista Academy | Developed by Damien' })
                .setTimestamp()
        ]
    });
});
client.login(process.env.TOKEN);
