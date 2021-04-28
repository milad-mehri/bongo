const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'monthly',
	description: 'Claim your monthly coins!',
	usage: '`a.monthly`',
  category: 'economy',

	async execute(message, premiumusers) {
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


		var result = await db.fetch(message.author.id);

		let cooldown = 2628000 * 1000; // 12 hours in ms

		let lastmonthly = parseInt(result.monthly + '000')

		if (lastmonthly !== null && cooldown - (Date.now() - lastmonthly) > 0) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lastmonthly);
			re(
				'Woah slow down',
				`You have to wait` + '`' + timeObj / 1000 + '`s before claiming your monthly coins.'
			);
		} else {

			var medal = result.medal
			if (parseInt(medal) > 0) {
				var monthly = 200000
			} else {
				var monthly = 100000
			}
			// Otherwise they'll get their daily



			let bal = result.bal


			var newbal = parseInt(bal) + monthly;


			await db.set(message.author.id, 'bal', newbal)

			result = await db.fetch(message.author.id);

			bal = result.bal




			re(
				'Here are your monthly coins',
				`**${monthly}** coins were added to your balance\n\nYou now have **$` + comma(bal) + '**');

			var time = Date.now().toString().slice(0, -3)
			await db.set(message.author.id, 'monthly', time)
		}















	},
};














