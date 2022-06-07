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
const embedsConstruct_1 = __importDefault(require("../functions/embedsConstruct"));
let embedClass = new embedsConstruct_1.default();
exports.default = {
    category: 'Utility',
    description: "Create a new ticket",
    testOnly: true,
    slash: true,
    expectedArgs: '<reason>',
    expectedArgsTypes: ['STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        let reason = interaction.options.getString('reason');
        let author = interaction.member;
        let cate = interaction.guild.channels.cache.find((c) => c.name.toLowerCase() === "tickets" && c.type === "GUILD_CATEGORY");
        if (!cate)
            return interaction.reply({ ephemeral: true, content: 'No such category is found.' });
        let existingTicket = interaction.guild.channels.cache.find((exist) => exist.name == author.displayName);
        if (!existingTicket) {
            let channel = yield interaction.guild.channels.create("restricted", {
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL"],
                    },
                    {
                        id: '973310352936808468',
                        allow: ["VIEW_CHANNEL"],
                    },
                    {
                        id: '973310353591111730',
                        allow: ["VIEW_CHANNEL"],
                    },
                ],
            }).then(channell => channell.setParent(cate));
            interaction.reply({ embeds: [yield embedClass.infoEmbed('Ticket created', `\n Your ticket is at <#${channel.id}>. One of our staff member will be with you shortly.`)], ephemeral: true });
        }
        else {
            interaction.reply({ embeds: [yield embedClass.errorEmbed('Already have an existing ticket', 'You already have an existing ticket.')] });
        }
    })
};
