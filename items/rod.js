const Discord = require('discord.js');

module.exports = {
    name: 'rod',
    displayName: "Fishing Rod",
    aliases: ['fishing_rod', 'fishing', 'fishing-rod', 'pole', 'rods', 'poles'],
    cooldown: 10,
    description: 'You can use rods to fish!',
    emoji: ":fishing_pole_and_fish:",
    price: 15000,
    inshop: true,

    async execute(message, args) {
        message.client.commands.get('fish').execute(message, args);
    }
}
