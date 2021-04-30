const Discord = require('discord.js');

module.exports = {
    name: 'diamond',
    aliases: ['diamonds', 'diamondes'],
    displayName: "Diamond",
    inshop: false,
    emoji: ':small_blue_diamond:',
    price: 10000000,
    description: "Flex on the slightly poorer people.",

    async execute(message, args, result) {
        if(!result.diamond) return message.channel.send('You have no diamonds. :laughing:')
        message.channel.send('You can\'t use diamonds.')
    }
} 