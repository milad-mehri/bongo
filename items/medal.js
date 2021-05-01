const Discord = require('discord.js');

module.exports = {
    name: 'medal',
    displayName: "Medal",
    aliases: ['medals', 'medales'],
    inshop: true,
    emoji: ':medal:',
    price: 1000000,
    description: "Increases your hourly, daily and monthly coins (dont stack).",

    async execute(message, args, result) {
        if(!result.items.medal) return message.channel.send('You have no medals. :laughing:')
        message.channel.send('Medals are always being used.')
    }
} 