const Discord = require('discord.js');

module.exports = {
    name: 'medal',
    displayName: "Medal",
    aliases: ['medals', 'medales'],
    inshop: false,
    emoji: ':medal:',
    price: 10000000,
    description: "Increases your hourly, daily and monthly coins (dont stack).",

    async execute(message, args, result) {
        if(!result.medal) return message.channel.send('You have no medals. :laughing:')
        message.channel.send('Medals are always being used.')
    }
} 