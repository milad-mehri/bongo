const Discord = require('discord.js');

module.exports = {
    name: 'clover',
    aliases: ['clovers', 'cloveres'],
    cooldown: 3,

    async execute(message, args, result) {
        message.channel.send('Clovers have been temperately **disabled**.')
    }
}