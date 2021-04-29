const Discord = require('discord.js');

module.exports = {
    name: 'diamond',
    aliases: ['diamonds', 'diamondes'],
    cooldown: 3,

    async execute(message, args, result) {
        if(!result.diamond) return message.channel.send('You have no diamonds. :laughing:')
        message.channel.send('You can\'t use diamonds.')
    }
}