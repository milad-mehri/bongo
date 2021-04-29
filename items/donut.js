
const db = require('../db.js');
const Discord = require('discord.js');

module.exports = {
    name: 'donut',
    aliases: ['donuts', 'donutes', 'doughnut', 'doughnuts', 'doughnutes'],
    cooldown: 3,

    async execute(message, args, result,amount) {
        
        let bal = result.bal
        let donuts = result.donut
        if (donuts === null || donuts < 1) return message.reply('you have no donuts to eat.')
        if (amount > donuts) return message.reply('you dont have that many donuts!')
        

        



        result = await db.set(message.author.id, 'donut', donuts-amount);
        var random = Math.floor(Math.random() * (115 - 25 + 1) + 25);

      
        var v = 0;
        for (let i = 0; i < amount; i++) {
            random = Math.floor(Math.random() * (115 - 25 + 1) + 25);
            v += random


        }


        var newbal = parseInt(bal) + parseInt(v);
        db.set(message.author.id, 'bal', newbal);
        message.channel.send('You ate your **' + amount + ' donuts** and made **$' + v + '** coins :doughnut:  ')






    }
}