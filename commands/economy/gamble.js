const db = require('../../db.js');
const Discord = require('discord.js');

const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions');

module.exports = {
	name: 'gamble',
	description: 'Gamble money with the bot!',
	aliases: ['bet'],
	usage: '`a.gamble <amount>`',
	category: 'economy',
	cooldown: 10,

	async execute(message, args, premiumusers) {


		var result = await db.fetch(message.author.id)
		let bal = result.bal

		var amount = parseInt(args[0])
		if (amount === 'all' || amount === 'max') {
			(bal > 500000) ? amount = 500000 : amount = bal
		}
		if (amount === 'half') amount = bal / 2



		//errors
		if (bal > 10000000) return embeds.errorEmbed(message, 'You are** too rich **to gamble, go do something **useful!**')
		if (!amount) return embeds.errorEmbed(message, 'You have to **say the amount** you wanna gamble');
		if (amount > 500000) return embeds.errorEmbed(message, 'You **can\'t gamble** more than **500k**.');
		if (amount < 50) return embeds.errorEmbed(message, 'You **can\'t gamble less than 50 **poor kid.');
		if (bal < amount) return embeds.errorEmbed(message, 'You **only have ' + bal + ' coins**, dont try and **lie** to me bro.');

		var bot = Math.floor(Math.random() * 8 + 1);
		var user = Math.floor(Math.random() * 10 + 1);

		if (bot > user) {

			await db.set(message.author.id, 'loss', result.loss + 1)
			await db.set(message.author.id, 'bal', parseInt(bal) - parseInt(amount))

			return embeds.defaultEmbed(
				message,
				'You lost',
				`**You** rolled ${'`' + user + '`'}
				 **Bongo** rolled: ${'`' + bot + '`'}\n
				 You lost: $${functions.comma(amount)}
				 You now have: $${functions.comma(parseInt(bal) - parseInt(amount))}`,
				'red',
				'discord.gg/yt6PMTZNQh'
			)

		} else if (bot < user) {


			await db.set(message.author.id, 'win', result.win + 1)
			await db.set(message.author.id, 'bal', parseInt(bal) + parseInt(amount))


			return embeds.defaultEmbed(
				message,
				'You won!',
				`**You** rolled ${'`' + user + '`'}
				 **Bongo** rolled: ${'`' + bot + '`'}\n
				 You won: $${functions.comma(amount)}
				 You now have: $${functions.comma(parseInt(bal) - parseInt(amount))}`,
				'green',
				'discord.gg/yt6PMTZNQh'
			)
		}
		if (bot === user) {

			return embeds.defaultEmbed(
				message,
				'You tied...',
				`**You** rolled ${'`' + user + '`'}
				 **Bongo** rolled: ${'`' + bot + '`'}\n\n\n
				 You now have: $${functions.comma(parseInt(bal) - parseInt(amount))}`,
				'grey',
				'discord.gg/yt6PMTZNQh'
			)

		}

	},
};


