const Discord = require('discord.js');


module.exports = {
	name: 'coin',
	description: 'Flip a coin!',
	usage: '`a.coin`',
  category: 'fun',


	execute(message) {

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






		re(message.author.username + 's Coin flip', 'Heads or tails? :coin:')
		var random = Math.floor(Math.random() * 2 + 1);

		// First argument is a filter function - which is made of conditions
		// m is a 'Message' object
		message.channel.awaitMessages(m => m.author.id == message.author.id,
			{ max: 1, time: 10000 }).then(collected => {
				// only accept messages by the user who sent the command
				// accept only 1 message, and return the promise after 30000ms = 30s

				// first (and, in this case, only) message of the collection
				if (collected.first().content.toLowerCase() == 'heads' || collected.first().content.toLowerCase() == 'head') {
					if (random === 2) {
						re('Correct! ', 'The answer was heads!');
						return;

					} else {
						re('WRONG!', 'The answer was tails!');
						return;

					}
				} else if (collected.first().content.toLowerCase() == 'tails' || collected.first().content.toLowerCase() == 'tail') {
					if (random === 1) {
						re('Correct!', 'The answer was tails!');
						return;

					} else {
						re('WRONG!', ' The answer was heads!');
						return;

					}
				}

				else
					message.reply('Invalid input! :angry: ');
			}).catch(() => {
				message.reply('no answer after 10 seconds, no coin flip!');
			});





	},
};
















