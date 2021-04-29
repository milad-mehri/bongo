const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const emojis = require('../../design/emojis.json')

module.exports = {
	name: 'daily',
	description: 'Claim your daily coins!',
	usage: '`a.daily`',
	category: 'economy',
	cooldown: 43200,

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
			var daily = 3000
		} else {
			var daily = 1000
		}

		var newbal = parseInt(result.bal) + daily;


		await db.set(message.author.id, 'bal', newbal)

	

		embeds.successEmbed(message, ' Successfully **claimed $' + comma(daily) + '** coins!\n\n You can get **more rewards** by voting for the bot [here.](https://top.gg/bot/780943575394942987/vote)\nor you can vote for the [support server](https://discord.gg/yt6PMTZNQh) [here](https://top.gg/servers/781393539451977769/vote)\n\nYou can do your next daily in **12 hours**.');



	},
};

