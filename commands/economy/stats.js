const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'stats',
	description: 'View the gambling stats of yourself or another user',
	usage: '`a.stats`',
	category: 'economy',


	async execute(message, args) {


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



		if (!message.mentions.users.size) {

			let result = await db.fetch(message.author.id);
			let win = result.win
			let loss = result.loss



			var total = parseInt(loss) + parseInt(win)
			var winrate = parseInt(win) / parseInt(total)
			var per = winrate * parseInt('100')

			if (isNaN(per)) {

				per = 0
			}


			re(message.author.username + "'s gambling stats", `**Wins** :  ${win}\n**Losses** :  ${loss}\n\n**Total gambles** : ${total}\n**Win %** : ${per}`)

		} else {
			var member = message.mentions.users.first();
			let result = await db.fetch(member.id);
			let win = result.win
			let loss = result.loss



			var total = parseInt(loss) + parseInt(win)
			var winrate = parseInt(win) / parseInt(total)
			var per = winrate * parseInt('100')

			if (isNaN(per)) {

				per = 0
			}


			re(member.username + "'s gambling stats", `**Wins** :  ${win}\n**Losses** :  ${loss}\n\n**Total gambles** : ${total}\n**Win %** : ${per}`)


		}





	},
};
















