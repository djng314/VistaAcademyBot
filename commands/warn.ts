// JAVASCRIPT:
// const warnSchema = require('../models/warn-schema')

// TYPESCRIPT:
import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import warnSchema from "../models/warn-schema";

// JAVASCRIPT:
// module.exports = {}

// TYPESCRIPT:
export default {
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

  callback: async ({ guild, member: staff, interaction }) => {
    const subCommand = interaction.options.getSubcommand();
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const id = interaction.options.getString("id");

    if (subCommand === "add") {
      const warning = await warnSchema.create({
        userId: user?.id,
        staffId: staff.id,
        guildId: guild?.id,
        reason,
      });
      const AddEmbed = new MessageEmbed()
      .setTitle("**Warning Added**")
      .setColor("#A4FBFC")
      .setDescription(`Added warning ${warning.id} to <@${user?.id}>`)
      .setFooter({text: "Vista Academy | Developed by Damien"});
      return AddEmbed
    } else if (subCommand === "remove") {
      const warning = await warnSchema.findByIdAndDelete(id);

      const RemoveWarning = new MessageEmbed()
      .setTitle("**Warning Removed**")
      .setColor("#B2FCA4")
      .setDescription(`Removed warning ${warning.id} to <@${user?.id}>`)
      .setFooter({text: "Vista Academy | Developed by Damien"});
      return RemoveWarning
    } else if (subCommand === "list") {
      const warnings = await warnSchema.find({
        userId: user?.id,
        guildId: guild?.id,
      });

      let description = `\n`;

      for (const warn of warnings) {
        description += `**ID:** ${warn._id}\n`;
        description += `**Date:** ${warn.createdAt.toLocaleString()}\n`;
        description += `**Staff:** <@${warn.staffId}>\n`;
        description += `**Reason:** ${warn.reason}\n\n`;
      }

      const embed = new MessageEmbed()
      .setTitle(`**Warnings for ${user?.username}**`)
      .setDescription(description)
      .setColor("#B2FCA4")
      .setFooter({text: "Vista Academy | Developed by Damien"});

      return embed;
    }
  },
} as ICommand;