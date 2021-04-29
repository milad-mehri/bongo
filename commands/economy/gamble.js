


const db = require('../../db.js');
const Discord = require('discord.js');

const embeds = require('../../functions/embeds')
const colors = require('../../design/colors.json');




module.exports = {
	name: 'gamble',
	description: 'Gamble money with the bot!',
	aliases: ['bet'],
	usage: '`a.gamble <amount>`',
	category: 'economy',
	cooldown: 10,

	async execute(message, args, premiumusers) {
		function comma(number) {
			var i = number.toString();
			i = i.split("").reverse();
			i.forEach((item, index) => {
				if (index % 3 == 0) i[index] = i[index] + ",";
			});
			i[0] = i[0][0];
			return i.reverse().join("");
		}


		var result = await db.fetch(message.author.id)

		// Otherwise they'll get their daily
		let bal = result.bal

		if (parseInt(bal) > 10000000) {

			return embeds.errorEmbed(message, 'You are** too rich** to gamble, go** do something useful**!')
			return;
		}

		var amount = args[0]
		if (!amount || isNaN(amount)) {
			return embeds.errorEmbed(message, ' You have to** say the amount you wanna gamble**.');
		}

		if (amount === 'all' || amount === 'max') {
			if (parseInt(bal) > 200000) {
				amount = '200000'
			} else {
				amount = parseInt(bal)
			}
		}

		if (amount === 'half') {
			var mowney = parseInt(bal) / 2
			if (50 > parseInt(mowney)) {
				return embeds.errorEmbed(message, 'You **can\'t gamble less than 50** poor kid.');
			}
			if (200000 < parseInt(mowney)) {
				return embeds.errorEmbed(message, 'You **can\'t gamble more than 200k**.');
			}

			amount = mowney


		}

		if (50 > parseInt(amount)) {
			return embeds.errorEmbed(message, 'You **can\'t gamble less than 50** poor kid.');
		}
		if (200000 < parseInt(amount)) {
			return embeds.errorEmbed(message, 'You **can\'t gamble more than 200k**.');
		}

		if (parseInt(bal) < parseInt(amount)) {
			return embeds.errorEmbed(message, 'You **only have ' + bal + ' coins**, dont** try and lie** to me bro.');
		} else {







			var bot = Math.floor(Math.random() * 8 + 1);

			var user = Math.floor(Math.random() * 10 + 1);

			if (bot > user) {




				let loss = result.loss + 1


				await db.set(message.author.id, 'loss', loss)


				var newbal = parseInt(bal) - parseInt(amount);
				await db.set(message.author.id, 'bal', newbal)

				const exampleEmbed = new Discord.MessageEmbed()
					.setColor(colors.red)
					.setTitle('You lost')

					.setDescription(
						'**You** rolled `' +
						user +
						'`\n**Bongo** rolled: `' +
						bot +
						'`\n \n  You lost: $' +
						parseInt(amount) +
						'\nYou now have: $' +
						comma(newbal)
					)

					.setFooter('discord.gg/yt6PMTZNQh');

				message.channel.send(exampleEmbed);
			}
			if (bot < user) {



				let win = result.win + 1

				await db.set(message.author.id, 'win', win)








				var newbal = parseInt(bal) + parseInt(amount);
				await db.set(message.author.id, 'bal', newbal)

				const exampleEmbed = new Discord.MessageEmbed()
					.setColor(colors.green)
					.setTitle('You Won!')

					.setDescription(
						'**You** rolled `' +
						user +
						'`\n**Bongo** rolled: `' +
						bot +
						'`\n \n You won: $' +
						parseInt(amount) +
						'\nYou now have: $' +
						comma(newbal)
					)

					.setFooter('discord.gg/yt6PMTZNQh');

				message.channel.send(exampleEmbed);
			}

			if (bot === user) {
				var newbal = parseInt(bal);
				await db.set(message.author.id, 'bal', newbal)

				const exampleEmbed = new Discord.MessageEmbed()
					.setColor(colors.grey)
					.setTitle('You tied..')

					.setDescription(
						'**You** rolled `' +
						user +
						'`\n**Bongo** rolled: `' +
						bot +
						'`\n\n\n \n  You now have $' +
						comma(newbal)
					)

					.setFooter('discord.gg/yt6PMTZNQh');

				message.channel.send(exampleEmbed);
			}




		}


	},
};


