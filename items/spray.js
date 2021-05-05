const db = require("../db")
const emojis = require('../design/emojis.json')
const Discord = require('discord.js');
const functions = require("../functions/functions");

module.exports = {
    name: 'spray',
    displayName: "Pepper Spray",
    inshop: true,
    aliases: ['pepper', 'sprays', 'peper', 'peppers'],
    emoji: emojis.spray,
    price: 5000,
    description: "Blind your opponent so they can't rob anyone for a while!",

    async execute(message, args ) {
        var target = message.mentions.users.first();
        if (!target) return message.channel.send("You need to **mention** someone.")

        if(target === message.author){
            return message.channel.send("You can't spray yourself lmao.")
        }
        var result = await db.fetch(message.author.id)

        if(result.items.spray < 1) return message.channel.send("You don't have any pepper spray...") 

        result.items.spray = result.items.spray - 1
        await db.set(message.author.id, "items", result.items)

        result = await db.fetch(target.id)

        var time = Math.floor(Math.random() * 10) + 1

        result.rob.banTime = time * 60000
        result.rob.banStart = Date.now()

        await db.set(target.id, "rob", result.rob)

        return message.channel.send(`**${target.username}** was blinded and cannot rob for **${functions.msToString(time * 60000)}**`)

    }
}