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
    description: "Close a ticket",
    testOnly: true,
    slash: true,
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        let channel = interaction.channel;
        if (channel.parent.name === 'tickets') {
            channel.delete('Closing ticket');
        }
        else {
            interaction.reply({ embeds: [yield embedClass.errorEmbed('Error', 'You can only close a ticket channel.')] });
        }
    })
};
