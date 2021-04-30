const Discord = require('discord.js');

module.exports = {
    name: 'rare',
    displayName: "Rare Fish",
    inshop: false,
    emoji: ':tropical_fish:',
    price: 10000,
    description: "Rare fishes can only be found by fishing with your rod.\nThe only purpose of it is to collect.",

    async execute(message, args, result) {
        message.channel.send('You can\'t use fish...')
    }
}