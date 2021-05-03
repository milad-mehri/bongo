const Discord = require('discord.js');
const db = require("../db")
const functions = require("../functions/functions")
module.exports = {
    name: 'clover',
    displayName: "Clover",
    aliases: ['clovers', 'cloveres'],
    cooldown: 3,
    inshop: true,
    emoji: ':four_leaf_clover:',
    price: 7000,
    description: "Increase your luck while gambling!",

    async execute(message, args, result) {
        if (result.gamble.multiplier.startTime + result.gamble.multiplier.time > Date.now() && result.gamble.multiplier.amount > 0) {
            var responses = ["Woah buddy!", "Chill bro,", "What's the rush?"] 

            var timeLeft = (result.gamble.multiplier.time + result.gamble.multiplier.startTime) - Date.now()

            return message.channel.send(`You already have a ${'`'+result.gamble.multiplier.amount + '%`'} multi for another **${functions.msToString(timeLeft)}**!`)
        }

        if(result.items.clover < 1) return message.channel.send("You don't have any clovers...")

        result.items.clover =   result.items.clover  - 1

        result.gamble.multiplier.startTime = Date.now()

        var time = Math.floor(Math.random() * 15) + 1
        var multi = Math.floor(Math.random() * 10) + 1


        result.gamble.multiplier.time = time * 60000
        result.gamble.multiplier.amount = multi

        message.channel.send(`You got a ${'`' + multi + '%`'} gambling multi for ${'`'+time+'`'} minutes!`)

        await db.set(message.author.id, 'gamble', result.gamble)
        await db.set(message.author.id, 'items', result.items)

        /*
            if (result.gamble.multiplier.startTime + result.gamble.multiplier.time > Date.now() && result.gamble.multiplier.amount > 0) {
            var multi = result.gamble.multiplier.amount
        } else {*/
    }
}