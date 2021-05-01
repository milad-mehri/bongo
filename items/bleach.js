
const db = require('../db.js');
const Discord = require('discord.js');
const embeds = require('../functions/embeds')

module.exports = {
    name: 'bleach',
    displayName: "Bleach",
    aliases: ['bleachs', 'bleaches'],
    cooldown: 3,
    inshop : true,
    emoji: ':baby_bottle:',
    price: 10000,
    description: "Risk up to 80% of your money to gain up to 50%?",

    async execute(message, args, result, amount) {
        let bal = result.bal

        if(amount > 1) return embeds.errorEmbed(message, "You can only use 1 bleach at a time.")
        var bleachs = result.items.bleach
        if (bleachs === null || bleachs < 1) return embeds.errorEmbed(message, 'You have no bleach to drink.')

        result.items.bleach = bleachs - 1
        await db.set(message.author.id, 'items', result.items)


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