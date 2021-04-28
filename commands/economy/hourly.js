const db = require('../../db.js');
const Discord = require('discord.js');
const userSchema = require('../../schemas/user-schema')


module.exports = {
	name: 'hourly',
	description: 'Claim your hourly coins!',
	usage: '`a.hourly`',
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


		let cooldown = 3600000; // 12 hours in ms




		let lasthourly = parseInt(result.hourly + '000')

		if (lasthourly !== null && cooldown - (Date.now() - lasthourly) > 0) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lasthourly);
			re(
				'Woah slow down',
				`You have to wait` + '`' + timeObj / 1000 + '`s before claiming your hourly coins.'
			);
		} else {
			// Otherwise they'll get their daily
			var medal = result.medal
			if (parseInt(medal) > 0) {
				var hourly = 5000
			} else {
				var hourly = 1000
			}
			// Otherwise they'll get their daily



			let bal = result.bal


			var newbal = parseInt(bal) + hourly;

			await db.set(message.author.id, 'bal', newbal)

			result = await db.fetch(message.author.id);

			bal = result.bal

			re(
				'Here are your hourly coins',
				`**${hourly}** coins were added to your balance\n\nYou now have **$` + comma(bal) + '**');

			var time = Date.now().toString().slice(0, -3)
			await db.set(message.author.id, 'hourly', time)

		}






	}







};
