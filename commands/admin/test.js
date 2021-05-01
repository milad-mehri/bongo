const Discord = require('discord.js');
const embeds = require('../../functions/embeds.js');
const db = require("../../db")

module.exports = {
    name: 'test',
    description: 'Admin command',

    async execute(message, args) {

        if (message.author.id !== '248692731163967498') {
            return;
        }


        var result = await db.fetch (message.author.id)
        result.businessObject.stock = "ddddddddd"


        await db.set(message.author.id, 'businessObject', result.businessObject)

        console.log("DONE")

    },
};