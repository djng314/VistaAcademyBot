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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const footerText = 'Vista Academy | Developed by Damien';
class embedsCreate {
    infoEmbed(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let embedToReturn = new discord_js_1.MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor('BLUE')
                .setFooter({ text: footerText });
            return embedToReturn;
        });
    }
    errorEmbed(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let embedToReturn = new discord_js_1.MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor('RED')
                .setFooter({ text: footerText });
            return embedToReturn;
        });
    }
    moderationEmbed(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let embedToReturn = new discord_js_1.MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor('ORANGE')
                .setFooter({ text: footerText });
            return embedToReturn;
        });
    }
    embedLog(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let embedToReturn = new discord_js_1.MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor('NOT_QUITE_BLACK')
                .setFooter({ text: footerText });
            return embedToReturn;
        });
    }
}
exports.default = embedsCreate;
