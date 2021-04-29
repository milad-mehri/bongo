const Discord = require('discord.js');
const embeds = require('../../functions/embeds.js');


module.exports = {
    name: 'test',
    description: 'Admin command',

    execute(message, args) {

        if (message.author.id !== '248692731163967498') {
            return;
        }
        return embeds.errorEmbed(message, 'The test has passed!')


    },
};