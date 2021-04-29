
const db = require('../db.js');
const Discord = require('discord.js');

module.exports = {
    name: 'bleach',
    aliases: ['bleachs', 'bleaches'],
    cooldown: 3,

    async execute(message, args, result) {
        let bal = result.bal


        var bleachs = result.bleach
        if (bleachs === null || bleachs < 1) return message.reply('you have no bleach to drink.')

        result = await db.set(message.author.id, 'bleach', (bleachs) - 1)


        message.reply('You drank bleach and...')
        var random = Math.floor(Math.random() * 2 + 1);
        var loseAmountPercentage = Math.floor(Math.random() * 50 + 1);
        var winAmountPercentage = Math.floor(Math.random() * 30 + 1);

        if (random === 1) {
            console.log()
            var finalAmount = Math.round(((`${winAmountPercentage}`) * (bal)) / 100)

            var newbal = (bal) + finalAmount
            result = db.set(message.author.id, 'bal', newbal)

            return message.channel.send('Your video of drinking bleach **went viral** and you made **$' + finalAmount + '** from ads!')


        } else if (random === 2) {
            var finalAmount = Math.round(((`${loseAmountPercentage}`) * (bal)) / 100)
            var newbal = (bal) - finalAmount
            result = db.set(message.author.id, 'bal', newbal)
            return message.channel.send('You almost **died** and had to spend **$' + finalAmount + '** on hospital treatments!')


        }

    }
}