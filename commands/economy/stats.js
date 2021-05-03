const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')


module.exports = {
	name: 'stats',
	description: 'View the gambling stats of yourself or another user',
	usage: '`a.stats`',
	category: 'economy',


	async execute(message, args) {



		if (!message.mentions.users.size) {

			let result = await db.fetch(message.author.id);
			let win = result.gamble.win
			let loss = result.gamble.loss



			var total = parseInt(loss) + parseInt(win)
			var winrate = parseInt(win) / parseInt(total)
			var per = winrate * parseInt('100')

			if (isNaN(per)) {

				per = 0
			}


			embeds.defaultEmbed(message, message.author.username + "'s gambling stats", `**Wins** :  ${win}\n**Losses** :  ${loss}\n\n**Total gambles** : ${total}\n**Win %** : ${per}`)

		} else {
			var member = message.mentions.users.first();
			let result = await db.fetch(member.id);
			let win = result.gamble.win
			let loss = result.gamble.loss
 


			var total = parseInt(loss) + parseInt(win)
			var winrate = parseInt(win) / parseInt(total)
			var per = winrate * parseInt('100')

			if (isNaN(per)) {

				per = 0
			}


			embeds.defaultEmbed(message, member.username + "'s gambling stats", `**Wins** :  ${win}\n**Losses** :  ${loss}\n\n**Total gambles** : ${total}\n**Win %** : ${per}`)


		}





	},
};
















