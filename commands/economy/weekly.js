const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'weekly',
	description: 'Claim your weekly coins',
	usage: '`a.weekly`',
  category: 'economy',

	async execute(message, premiumusers) {

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

		let cooldown = 604800 * 1000;; // 12 hours in ms

		let lastWeekly = parseInt(result.weekly + '000')

		if (lastWeekly !== null && cooldown - (Date.now() - lastWeekly) > 0) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lastWeekly);
			re(
				'Woah slow down',
				`You have to wait` + '`' + timeObj / 1000 + '`s before claiming your weekly coins.'
			);
		} else {

			var medal = result.medal
			if (parseInt(medal) > 0) {
				var weekly = 50000
			} else {
				var weekly = 10000
			}
			// Otherwise they'll get their daily



			let bal = result.bal


			var newbal = parseInt(bal) + weekly;


			await db.set(message.author.id, 'bal', newbal)

			result = await db.fetch(message.author.id);

			bal = result.bal




			re(
				'Here are your weekly coins',
				`**${weekly}** coins were added to your balance\n\nYou now have **$` + comma(bal) + '**');

			var time = Date.now().toString().slice(0, -3)
			await db.set(message.author.id, 'weekly', time)
		}















	},
};














