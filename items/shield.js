const Discord = require('discord.js');

module.exports = {
    name: 'shield',
    aliases: ['shields', 'shieldes'],
    inshop: false,
    emoji: ':shield:',
    price: 10000000,
    description: "Protect yourself from any robbers!",

    async execute(message, args, result) {
        if(!result.shield) return message.channel.send('You have no shields to use.')
        message.channel.send('Shields are always being used.')
    }
} 