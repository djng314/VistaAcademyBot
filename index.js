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
const express_1 = __importDefault(require("express"));
const bad_words_1 = __importDefault(require("bad-words"));
const body_parser_1 = __importDefault(require("body-parser"));
let port = 5075;
let app = (0, express_1.default)();
const talkedRecently = new Set();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
//Authentication
app.use((req, res, next) => {
    const auth = { login: 'zutureadmin', password: 'Zu7u4eVbXm8o0' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    if (login && password && login === auth.login && password === auth.password) {
        return next();
    }
    // Access denied
    res.set('WWW-Authenticate', 'Basic realm="401"'); // change this if you want to be a 
    res.status(401).send('Authentication required.'); // custom message
});
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
        // mongoUri: "mongodb+srv://Vista Academydiscord:Vista Academy314@cluster0.1gt3c.mongodb.net/test"
        mongoUri: process.env["dbLink"]
    });
}));
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connection To MongoDB Atlas Successful!");
});
app.get("/", (request, response) => {
    var ResponseTable = { status: "Success", app: "Online" };
    let primaryGuild = client.guilds.cache.get('973253184137076806');
    let errorChannel = primaryGuild.channels.cache.get('973555709537042452');
    errorChannel.send({
        embeds: [new discord_js_1.MessageEmbed()
                .setTitle('Notification')
                .setDescription('This is a test message triggered by my API.')
                .setColor('AQUA')
                .setTimestamp()
        ]
    });
    response.status(200).json(ResponseTable);
});
app.post("/log", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let actions = request.body.actionLogs;
    for (const action of actions) {
        let moderator = action.Moderator;
        let actionTaken = action.Action;
        if (actionTaken == 'Ban' || actionTaken == 'Kick' || actionTaken == 'Warn') {
            let reason = action.Reason;
            let target = action.Target;
            let primaryGuild = client.guilds.cache.get('973253184137076806');
            let logChannel = primaryGuild.channels.cache.get('975429627935866951');
            logChannel.send({ embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle(`${actionTaken} Log`)
                        .setDescription(`Moderator: ${moderator} \n Target: ${target} \n Reason: ${reason}`)
                        .setColor('PURPLE')
                        .setFooter({ text: 'Vista System | Developed by Damien' })
                ] });
        }
        else {
            let primaryGuild = client.guilds.cache.get('973253184137076806');
            let logChannel = primaryGuild.channels.cache.get('975429627935866951');
            logChannel.send({ embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle(`${actionTaken} Log`)
                        .setDescription(`Moderator: ${moderator}`)
                        .setColor('PURPLE')
                        .setFooter({ text: 'Vista Academy | Developed by Damien' })
                ] });
        }
        response.status(200).json({ status: 'Success' });
    }
}));
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
            if (message.member.user.bot) {
                console.log('Member is bot');
            }
            else {
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
    }
    let filter = new bad_words_1.default();
    let msg = message.content;
    if (filter.isProfane(msg)) {
        let primaryGuild = client.guilds.cache.get('973253184137076806');
        let errorChannel = primaryGuild.channels.cache.get('973555709537042452');
        errorChannel.send({
            embeds: [new discord_js_1.MessageEmbed()
                    .setTitle('Auto-mod')
                    .setDescription(`Profanity is detected and the message was deleted. \n Message: ${msg}`)
                    .setColor('BLURPLE')
                    .setFooter({ text: 'Vista Academy | Developed by Damien' })
                    .setTimestamp()
            ]
        });
    }
}));
client.on('messageDelete', message => {
    var _a, _b, _c, _d;
    console.log(`A message by ${(_a = message.member) === null || _a === void 0 ? void 0 : _a.user.username} was deleted, but we don't know by who yet.`);
    let primaryGuild = client.guilds.cache.get('973253184137076806');
    let channel = message.channel;
    let channelName = channel.name;
    let errorChannel = primaryGuild.channels.cache.get('973555709537042452');
    errorChannel.send({
        embeds: [new discord_js_1.MessageEmbed()
                .setTitle('Message Deleted')
                .setDescription(`A message by ${(_b = message.member) === null || _b === void 0 ? void 0 : _b.user.username} also known as ${(_c = message.member) === null || _c === void 0 ? void 0 : _c.displayName} (<@${(_d = message.member) === null || _d === void 0 ? void 0 : _d.id}>) was deleted in ${channelName} (<#${channel.id}>). \n\n ** Message Content: ** ${message.content}`)
                .setColor('RED')
                .setFooter({ text: 'Vista Academy | Developed by Damien' })
                .setTimestamp()
        ]
    });
});
app.listen(port, () => {
    console.log('App is online');
});
client.login(process.env.TOKEN);
