const Statcord = require("statcord.js");


const Discord = require('discord.js');

module.exports = {
    name: 'post',
    description: 'Admin command',
    aliases: ['setstatus'],

    execute(message, args) {

        if (message.author.id !== '248692731163967498') {
            return;
        }
        Statcord.ShardingClient.post(message.client);

    },
};