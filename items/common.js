const Discord = require('discord.js');

module.exports = {
    name: 'common',
    aliases: ['fish', 'fishes', 'fishs'],

    async execute(message, args, result) {
        message.channel.send('You can\'t use fish...')
    }
}