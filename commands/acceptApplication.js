"use strict";
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
const discord_js_1 = require("discord.js");
const applications_1 = __importDefault(require("../models/applications"));
const embedsConstruct_1 = __importDefault(require("../functions/embedsConstruct"));
let embedClass = new embedsConstruct_1.default();
exports.default = {
    category: 'Applications',
    description: "Accept an application",
    testOnly: true,
    slash: true,
    expectedArgs: '<applicaton-id>',
    expectedArgsTypes: ['STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        let author = interaction.member;
        let applicationID = interaction.options.getString('applicaton-id') || '';
        if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('975144760329269268')) {
            try {
                let data = yield applications_1.default.findById(applicationID);
                if (data) {
                    yield applications_1.default.findByIdAndUpdate(applicationID, { Status: 'Accepted' });
                    interaction.reply({ embeds: [yield embedClass.infoEmbed('Accepted Application', 'We have accepted the application.')] });
                }
                else {
                    interaction.reply({ embeds: [yield embedClass.errorEmbed('Invalid ID', 'We did not find any application with that ID')] });
                }
            }
            catch (e) {
                if (typeof e === "string") {
                    e.toUpperCase(); // works, `e` narrowed to string
                    console.log(e);
                    interaction.reply({
                        embeds: [new discord_js_1.MessageEmbed()
                                .setTitle('Error')
                                .setDescription('Invalid ID')
                                .setColor('RED')
                                .setFooter({ text: 'Vista Academy | Developed by Damien' })
                        ]
                    });
                    throw (e);
                    return;
                }
                else if (e instanceof Error) {
                    interaction.reply({
                        embeds: [new discord_js_1.MessageEmbed()
                                .setTitle('Error')
                                .setDescription('Invalid ID')
                                .setColor('RED')
                                .setFooter({ text: 'Vista Academy | Developed by Damien' })
                        ]
                    });
                    throw (e);
                }
            }
        }
        else {
            interaction.reply({ embeds: [yield embedClass.errorEmbed('Invalid Permission', 'You do not have permission for this commmand')] });
        }
    })
};
