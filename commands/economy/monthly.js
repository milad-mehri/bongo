const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const emojis = require('../../design/emojis.json')
const functions = require('../../functions/functions')

module.exports = {
	name: 'monthly',
	description: 'Claim your monthly coins!',
	usage: '`a.monthly`',
	category: 'economy',
	cooldown: 2592000,

	async execute(message) {




		var result = await db.fetch(message.author.id);


		var medal = result.medal
		if (parseInt(medal) > 0) {
			var monthly = 150000
		} else {
			var monthly = 100000
		}

		var newbal = parseInt(result.bal) + monthly;


		await db.set(message.author.id, 'bal', newbal)



		embeds.successEmbed(message, ' Successfully **claimed $' + functions.comma(monthly) + '** coins!\n\n You can get **more rewards** by voting for the bot [here.](https://top.gg/bot/780943575394942987/vote)\nor you can vote for the [support server](https://discord.gg/yt6PMTZNQh) [here](https://top.gg/servers/781393539451977769/vote)\n\nYou can do your next monthly in **30 days**.');



	},
};

