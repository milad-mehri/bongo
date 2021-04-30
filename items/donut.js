
const db = require('../db.js');
const Discord = require('discord.js');
const embeds = require('../functions/embeds')

module.exports = {
    name: 'donut',
    aliases: ['donuts', 'donutes', 'doughnut', 'doughnuts', 'doughnutes'],
    displayName: "Donut",
    cooldown: 3,
    inshop: true,
    emoji: ':doughnut:',
    price: 100,
    description: 'Get 1-150 coins per donut!',

    async execute(message, args, result,amount) {
        
        let bal = result.bal
        let donuts = result.donut
        if (donuts === null || donuts < 1) return embeds.errorEmbed(message,'You have no donuts to eat.')
        if (amount > donuts) return embeds.errorEmbed(message,'You dont have that many donuts!')
        

        



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