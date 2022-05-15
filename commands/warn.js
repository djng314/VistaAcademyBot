"use strict";
// JAVASCRIPT:
// const warnSchema = require('../models/warn-schema')
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
// TYPESCRIPT:
const discord_js_1 = require("discord.js");
const warn_schema_1 = __importDefault(require("../models/warn-schema"));
// JAVASCRIPT:
// module.exports = {}
// TYPESCRIPT:
exports.default = {
    category: "Moderation",
    description: "Warns a user",
    requireRoles: true,
    slash: true,
    testOnly: true,
    options: [
        {
            type: "SUB_COMMAND",
            name: "add",
            description: "Adds a warning to the user",
            options: [
                {
                    name: "user",
                    type: "USER",
                    description: "The user to add a warning to",
                    required: true,
                },
                {
                    name: "reason",
                    type: "STRING",
                    description: "The reason for the warning",
                    required: true,
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "remove",
            description: "Removes a warning from the user",
            options: [
                {
                    name: "user",
                    type: "USER",
                    description: "The user to remove a warning from",
                    required: true,
                },
                {
                    name: "id",
                    type: "STRING",
                    description: "The ID of the warning to remove",
                    required: true,
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "list",
            description: "Lists all warnings for the user",
            options: [
                {
                    name: "user",
                    type: "USER",
                    description: "The user to list warnings for",
                    required: true,
                },
            ],
        },
    ],
    callback: ({ guild, member: staff, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const subCommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const id = interaction.options.getString("id");
        if (subCommand === "add") {
            const warning = yield warn_schema_1.default.create({
                userId: user === null || user === void 0 ? void 0 : user.id,
                staffId: staff.id,
                guildId: guild === null || guild === void 0 ? void 0 : guild.id,
                reason,
            });
            const AddEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**Warning Added**")
                .setColor("#A4FBFC")
                .setDescription(`Added warning ${warning.id} to <@${user === null || user === void 0 ? void 0 : user.id}>`)
                .setFooter({ text: "Vista Academy | Developed by Damien" });
            return AddEmbed;
        }
        else if (subCommand === "remove") {
            const warning = yield warn_schema_1.default.findByIdAndDelete(id);
            const RemoveWarning = new discord_js_1.MessageEmbed()
                .setTitle("**Warning Removed**")
                .setColor("#B2FCA4")
                .setDescription(`Removed warning ${warning.id} to <@${user === null || user === void 0 ? void 0 : user.id}>`)
                .setFooter({ text: "Vista Academy | Developed by Damien" });
            return RemoveWarning;
        }
        else if (subCommand === "list") {
            const warnings = yield warn_schema_1.default.find({
                userId: user === null || user === void 0 ? void 0 : user.id,
                guildId: guild === null || guild === void 0 ? void 0 : guild.id,
            });
            let description = `\n`;
            for (const warn of warnings) {
                description += `**ID:** ${warn._id}\n`;
                description += `**Date:** ${warn.createdAt.toLocaleString()}\n`;
                description += `**Staff:** <@${warn.staffId}>\n`;
                description += `**Reason:** ${warn.reason}\n\n`;
            }
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`**Warnings for ${user === null || user === void 0 ? void 0 : user.username}**`)
                .setDescription(description)
                .setColor("#B2FCA4")
                .setFooter({ text: "Vista Academy | Developed by Damien" });
            return embed;
        }
    }),
};
