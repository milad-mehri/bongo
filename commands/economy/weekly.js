const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const emojis = require('../../design/emojis.json')

module.exports = {
	name: 'weekly',
	description: 'Claim your weekly coins!',
	usage: '`a.weekly`',
	category: 'economy',
	cooldown: 604800,

	async execute(message) {


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

		
			var medal = result.medal
			if (parseInt(medal) > 0) {
				var weekly = 150000
			} else {
				var weekly = 100000
			}

			let bal = result.bal


			var newbal = parseInt(bal) + weekly;


			await db.set(message.author.id, 'bal', newbal)

			result = await db.fetch(message.author.id);
			bal = result.bal


			embeds.successEmbed(message, ' Successfully **claimed $' + comma(weekly) + '** coins!\n\n You can get **more rewards** by voting for the bot [here.](https://top.gg/bot/780943575394942987/vote)\nor you can vote for the [support server](https://discord.gg/yt6PMTZNQh) [here](https://top.gg/servers/781393539451977769/vote)\n\nYou can do your next weekly in **7 Days**.');
	
		

	},
};

