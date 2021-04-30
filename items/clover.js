const Discord = require('discord.js');

module.exports = {
    name: 'clover',
    displayName : "Clover",
    aliases: ['clovers', 'cloveres'],
    cooldown: 3,
    inshop: true,
    emoji: ':four_leaf_clover:',
    price: 7000,
    description: "Increase your luck while gambling!",

    async execute(message, args, result) {
        message.channel.send('Clovers have been temperately **disabled**.')
    }
}