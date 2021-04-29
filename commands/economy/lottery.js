const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')


module.exports = {
	name: 'lottery',
	description: 'Enter the lottery!',
	usage: 'a.lottery',
	category: 'economy',

	async execute(message) {


		let result = await db.fetch(message.author.id)
		let bal = result.bal


		let lotteryy = result.enteredlottery



		if (lotteryy === true) {
			return embeds.blankEmbed(message, 'You **already entered** the lottery **this time**!')
		}


		if (parseInt(bal) < 1000) {
			return embeds.blankEmbed(message, 'You are** too broke** to enter the lottery.')

		}
		embeds.defaultEmbed(message, message.author.username + 's Order', 'Buy a lottery ticket for $1000? `yes` or `no`\nYou will get DM\'d if you win the lottery')


		message.channel.awaitMessages(m => m.author.id == message.author.id,
			{ max: 1, time: 10000 }).then(collected => {

				if (collected.first().content.toLowerCase() == 'y' || collected.first().content.toLowerCase() == 'yes') {


					var newbal = parseInt(bal) - 1000;
					db.set(message.author.id, 'bal', newbal);
					db.set(message.author.id, 'enteredlottery', true)

					embeds.successEmbed(message, 'Ticket purchased! Lottery ticket was purchased for $1,000')
				}

				else

					embeds.errorEmbed(message, '**Order canceled**! The lottery ticket was **not purchased**')
			}).catch(() => {
				embeds.errorEmbed(message, '**Order canceled**! The lottery ticket was **not purchased**')
			});










	},
};
