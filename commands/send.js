"use strict";
// module.exports = {}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Sends a message.',
    permissions: ['ADMINISTRATOR'],
    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    slash: 'both',
    callback: ({ message, interaction, args }) => {
        const channel = (message
            ? message.mentions.channels.first()
            : interaction.options.getChannel('channel'));
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.';
        }
        args.shift(); // Remove the channel from the arguments array
        const text = args.join(' ');
        channel.send(text);
        if (interaction) {
            interaction.reply({
                content: 'Send message!',
                ephemeral: true,
            });
        }
    },
};
