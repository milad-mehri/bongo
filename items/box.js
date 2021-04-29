const db = require('../db.js');
const Discord = require('discord.js');

module.exports = {
    name: 'box',
    aliases: ['boxes', 'boxs'],
    cooldown: 1,

    async execute(message, args, result) {

        let bal = result.bal
        let boxs = result.box

        if (boxs < 1) return message.reply('you have no boxes to open.')
        if (ammount > boxs) return message.reply('you dont have that many boxes!')

        result = await db.set(message.author.id, 'box', (result.box) - (ammount));


        var moneyAmount = Math.floor(Math.random() * (10000) + 1) * (ammount)
        var donutAmount = Math.floor(Math.random() * (10) + 1) * (ammount)


        await db.set(message.author.id, 'bal', (result.bal) + (moneyAmount));
        await db.set(message.author.id, 'donut', (result.donut) + (donutAmount));

        message.channel.send('You **opened ' + ammount + ' common box(s)** and made **`$' + moneyAmount + '** coins` and **' + donutAmount + ' donuts** :doughnut:  ')


    }
}