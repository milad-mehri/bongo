const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'lottery',
	description: 'Enter the lottery!',
	usage: 'a.lottery',
  category: 'economy',

	async execute(message) {
		//return message.reply('temperarly disabled')

		function re(a, b) {//embed function
			const embed = new Discord.MessageEmbed()
				// Set the title of the field
				.setTitle(a)
				// Set the color of the embed
				.setColor('6FA8DC')
				// Set the main content of the embed
				.setDescription(b);

			// Send the embed to the same channel as the message
			message.channel.send(embed);
		}



		let result = await db.fetch(message.author.id)
		let bal = result.bal


		let lotteryy = result.enteredlottery



		if (lotteryy === true) {
			return message.channel.send(' you already entered the lottery this time!')
		}


		if (parseInt(bal) < 1000) {
			return message.reply('you are too broke to enter the lottery')

		}
		re(message.author.username + 's Order', 'Buy a lottery ticket for $1000? `yes` or `no`\nYou will get DM\'d if you win the lottery')

		// First argument is a filter function - which is made of conditions
		// m is a 'Message' object
		message.channel.awaitMessages(m => m.author.id == message.author.id,
			{ max: 1, time: 10000 }).then(collected => {
				// only accept messages by the user who sent the command
				// accept only 1 message, and return the promise after 30000ms = 30s

				// first (and, in this case, only) message of the collection
				if (collected.first().content.toLowerCase() == 'y' || collected.first().content.toLowerCase() == 'yes') {


					var newbal = parseInt(bal) - 1000;
					db.set(message.author.id, 'bal', newbal);
					db.set(message.author.id, 'enteredlottery', true)

					re('Ticket purchased', 'The lottery ticket was purchased for' + ` $1000 you now have $${newbal}`)
				}

				else

					re('Order canceled', 'The lottery ticket was not purchased')
			}).catch(() => {
				re('Order canceled', 'The lottery ticket was not purchased')
			});










	},
};
