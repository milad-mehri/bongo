
const db = require('../db.js');
const Discord = require('discord.js');
const embeds = require('../functions/embeds')

module.exports = {
    name: 'ball',
    aliases: ['b', 'balls'],
    cooldown: 5,
    inshop: true,
    emoji: ':crystal_ball:',
    price: 100000,
    description: 'Get 1-500 coins everytime you use your balls.',

    async execute(message, args, result) {
        let balls = result.ball

        if (balls === null || balls < 1) return embeds.errorEmbed(message, 'You have no balls to bounce.')

        bal = result.bal
        balls = result.ball

        var random;

        var totalMoney = 0;
        for (var i = 0; i < balls; i++) {
            random = Math.floor(Math.random() * 500 + 1)
            totalMoney += random


        }

        var newbal = parseInt(bal) + parseInt(totalMoney);
        var result = await db.set(message.author.id, 'bal', newbal)
        var whattosend = ['you bounced your ' + balls + ' ball(s) and made $' + totalMoney + ' coins :person_bouncing_ball: ']
        if (Math.floor(Math.random() * (100) + 1) < Math.floor(balls / 10)) {
            await db.set(message.author.id, 'ball', balls - 1)
            whattosend.push(('\n:anguished: One of your balls rolled down the street and you now have ' + (balls - 1).toString()))

        }

        message.reply(whattosend.join(''))



    }
}