const Discord = require('discord.js');

module.exports = {
    name: 'fishing_rod',
    aliases: ['rod', 'fishing', 'fishing-rod', 'pole', 'rods', 'poles'],
    cooldown: 10,

    async execute(message) {
        message.client.commands.get('fish').execute(message, args);
    }
}