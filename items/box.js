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


    async execute(message, args, result,amount) {

        let bal = result.bal
        let boxs = result.box

        if (boxs < 1) return embeds.errorEmbed(message, 'You have no boxes to open.')
        if (amount > boxs) return embeds.errorEmbed(message, 'You dont have that many boxes!')

        result = await db.set(message.author.id, 'box', (result.box) - (amount));


        var moneyAmount = Math.floor(Math.random() * (10000) + 1) * (amount)
        var donutAmount = Math.floor(Math.random() * (10) + 1) * (amount)


        await db.set(message.author.id, 'bal', (result.bal) + (moneyAmount));
        await db.set(message.author.id, 'donut', (result.donut) + (donutAmount));

        message.channel.send('You **opened ' + amount + ' common box(s)** and made **$' + moneyAmount + '** coins and **' + donutAmount + ' donuts** :doughnut:  ')


    }
}