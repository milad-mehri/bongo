const Discord = require('discord.js');

module.exports = {
    name: 'common',
    aliases: ['fish', 'fishes', 'fishs'],
    displayName: "Common Fish",
    inshop: false,
    emoji: ':fish:',
    price: 100,
    description: "Common fishes can only be found by fishing with your rod.\nThe only purpose of it is to collect.",

    async execute(message, args, result) {
        message.channel.send('You can\'t use fish...')
    }
}