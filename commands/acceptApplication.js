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
    category: 'Applications',
    description: "Accept an application",
    testOnly: true,
    slash: true,
    expectedArgs: '<applicaton-id>',
    expectedArgsTypes: ['STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        let author = interaction.member;
        let applicationID = interaction.options.getString('applicaton-id') || '';
        interaction.reply({ embeds: [yield embedClass.errorEmbed('Command not available', 'This command is still under development. Please await further announcement.')] });
        /*
        if (author.roles.cache.get('973310352936808468') || author.roles.cache.get('975144760329269268')) {
            let data = await applications.findById(applicationID)
            if (data){

            }else{
                interaction.reply({embeds:[await embedClass.errorEmbed('Invalid ID','We did not find any application with that ID')]})
            }
        
        }else{
            interaction.reply({embeds:[await embedClass.errorEmbed('Invalid Permission','You do not have permission for this commmand')]})
        }*/
    })
};
