const db = require('../db.js');
const Discord = require('discord.js');
const embeds = require('../functions/embeds')

module.exports = {
    name: 'box',
    displayName: "Box",
    aliases: ['boxes', 'boxs'],
    cooldown: 1,
    inshop: false,
    emoji: ':package:',
    price: 7000,
    description: 'Get random amounts of money and random items!',


    async execute(message, args, result, amount) {

        let bal = result.bal
        let boxs = result.items.box

        if (boxs < 1) return embeds.errorEmbed(message, 'You have no boxes to open.')
        if (amount > boxs) return embeds.errorEmbed(message, 'You dont have that many boxes!')

        var moneyAmount = Math.floor(Math.random() * (10000) + 1) * (amount)
        var donutAmount = Math.floor(Math.random() * (10) + 1) * (amount)

        result.items.donut = result.items.donut + donutAmount
        result.items.box = boxs - 1

        await db.set(message.author.id, 'items', result.items)


        await db.set(message.author.id, 'bal', (result.bal) + (moneyAmount));

        message.channel.send('You **opened ' + amount + ' common box(s)** and made **$' + moneyAmount + '** coins and **' + donutAmount + ' donuts** :doughnut:  ')


    }
}