


const db = require('../../db.js');
const Discord = require('discord.js');





module.exports = {
	name: 'gamble',
	description: 'Gamble money with the bot!',
	aliases: ['bet'],
	usage: '`a.gamble <amount>`',
  category: 'economy',

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

		var result = await db.fetch(message.author.id)
		let cooldown = 5 * 1000;; // 12 hours in ms

		let lastbj = parseInt(result.bjcd + '000')

		if (lastbj !== null && cooldown - (Date.now() - lastbj) > 0) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lastbj);
			return re(
				'Woah slow down',
				`You have to wait` + '`' + timeObj / 1000 + '`s before gambling again.'
			);
		} else {
			var time = Date.now().toString().slice(0, -3)
			db.set(message.author.id, 'bjcd', time)

		}

		var result = await db.fetch(message.author.id)

		// Otherwise they'll get their daily
		let bal = result.bal

		if (parseInt(bal) > 10000000) {

			return message.reply('you are too rich to gamble, go do something useful!')
			return;
		}

		var amount = args[0]
		if (!amount) {
			return message.reply(' You have to say the amount you wanna gamble');
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
				return message.channel.send('You cant gamble less than 50 poor kid.');
			}
			if (200000 < parseInt(mowney)) {
				return message.channel.send('You cant gamble more than 200k.');
			}

			amount = mowney


		}
		if (isNaN(parseInt(amount))) {
			return message.reply('you have to say the amount you wanna gamble');
		}







		if (50 > parseInt(amount)) {
			return message.channel.send('You cant gamble less than 50 poor kid.');
		}
		if (200000 < parseInt(amount)) {
			return message.channel.send('You cant gamble more than 200k.');
		}

		if (parseInt(bal) < parseInt(amount)) {
			message.channel.send(
				'You only have ' + bal + ' coins, dont try and lie to me bro.'
			);
		} else {









			var bot = Math.floor(Math.random() * 8 + 1);

			var user = Math.floor(Math.random() * 10 + 1);

			if (bot > user) {




				let loss = result.loss + 1


				await db.set(message.author.id, 'loss', loss)


				var newbal = parseInt(bal) - parseInt(amount);
				await db.set(message.author.id, 'bal', newbal)

				const exampleEmbed = new Discord.MessageEmbed()
					.setColor('#ff0000')
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

					.setFooter(
						'discord.gg/yt6PMTZNQh',
						'https://cdn.discordapp.com/avatars/780943575394942987/b079e07a200264fc1e721bed6f74cc32.png?size=128'
					);

				message.channel.send(exampleEmbed);
			}
			if (bot < user) {



				let win = result.win + 1

				await db.set(message.author.id, 'win', win)








				var newbal = parseInt(bal) + parseInt(amount);
				await db.set(message.author.id, 'bal', newbal)

				const exampleEmbed = new Discord.MessageEmbed()
					.setColor('#49ff00')
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

					.setFooter(
						'discord.gg/yt6PMTZNQh',
						'https://cdn.discordapp.com/avatars/780943575394942987/b079e07a200264fc1e721bed6f74cc32.png?size=128'
					);

				message.channel.send(exampleEmbed);
			}

			if (bot === user) {
				var newbal = parseInt(bal);
				await db.set(message.author.id, 'bal', newbal)

				const exampleEmbed = new Discord.MessageEmbed()
					.setColor('#808080')
					.setTitle('You tied..')

					.setDescription(
						'**You** rolled `' +
						user +
						'`\n**Bongo** rolled: `' +
						bot +
						'`\n\n\n \n  You now have $' +
						comma(newbal)
					)

					.setFooter(
						'discord.gg/yt6PMTZNQh',
						'https://cdn.discordapp.com/avatars/780943575394942987/b079e07a200264fc1e721bed6f74cc32.png?size=128'
					);

				message.channel.send(exampleEmbed);
			}


		}




	},
};


