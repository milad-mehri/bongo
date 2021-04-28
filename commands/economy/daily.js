const db = require('../../db.js');
const Discord = require('discord.js');

module.exports = {
	name: 'daily',
	description: 'Claim your daily coins!',
	usage: '`a.daily`',
  category: 'economy',

	async execute(message) {
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

		function comma(number) {
			var i = number.toString();
			i = i.split("").reverse();
			i.forEach((item, index) => {
				if (index % 3 == 0) i[index] = i[index] + ",";
			});
			i[0] = i[0][0];
			return i.reverse().join("");
		}
		var result = await db.fetch(message.author.id);

		let cooldown = 43200000; // 12 hours in ms

		let lastDaily = parseInt(result.daily + '000')

		if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lastDaily);
			re(
				'Woah slow down',
				`You have to wait` + '`' + timeObj / 1000 + '`s before claiming your daily coins.'
			);
		} else {


			var medal = result.medal
			if (parseInt(medal) > 0) {
				var daily = 30000
			} else {
				var daily = 10000
			}
			// Otherwise they'll get their daily

			let bal = result.bal


			var newbal = parseInt(bal) + daily;


			await db.set(message.author.id, 'bal', newbal)

			result = await db.fetch(message.author.id);
			bal = result.bal


			re(
				'Here are your daily coins',
				`**${daily}** coins were added to your balance\n\nYou now have **$` +
				comma(bal) +
				'**'
			);
			var time = Date.now().toString().slice(0, -3)
			await db.set(message.author.id, 'daily', time)
		}
















	},
};

