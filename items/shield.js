const Discord = require('discord.js');

module.exports = {
    name: 'shield',
    aliases: ['shields'],
    cooldown: 10,

    async execute(message) {
        message.client.commands.get('fish').execute(message, args);
    }
}