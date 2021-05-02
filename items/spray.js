const db = require("../db")
const emojis = require('../design/emojis.json')
const Discord = require('discord.js');
const functions = require("..//functions/functions")

module.exports = {
    name: 'spray',
    displayName: "Peper Spray",
    inshop: true,
    emoji: "<:spray:838296374801203250>",
    price: 5000,
    description: "Blind your opponent so they can't rob anyone for a while!",

    async execute(message, args) {
        var target = message.mentions.users.first();
        if (!target) return message.channel.send("You need to **mention** someone.")


        result.items.spray = result.items.spray - 1

        var result = await db.fetch(target.id)

        var time = Math.floor(Math.random() * 10) + 1

        result.rob.banTime = time * 60000
        result.rob.banStart = Date.now()

        message.channel.send(`${target.username} was blinded for ${functions.msToString(time * 60000)}`)
        await db.set(message.author.id, "items", result.items)
        await db.set(target.id, "rob", result.rob)

        return message.channel.send(`${target.username} was blinded for ${functions.msToString(time * 60000)}`)

    }
}