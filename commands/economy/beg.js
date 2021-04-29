const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const { responses } = require('../../helpers/beg.json')

module.exports = {
	name: 'beg',
	description: 'Beg randoms for money',
	usage: '`a.beg`',
	category: 'economy',

	async execute(message) {

		
		var result = await db.fetch(message.author.id)

		let cooldown = 10 * 1000;; // 12 hours in ms

		let lastbeg = parseInt(result.begcd + '000')
		if (lastbeg !== null && cooldown - (Date.now() - lastbeg) > 1) {
			let timeObj = cooldown - (Date.now() - lastbeg);
			return embeds.cooldownEmbed(message, timeObj);
		} else {
			
			var time = Date.now().toString().slice(0, -3)
			await db.set(message.author.id, 'begcd', time)

			var response = responses[Math.floor(Math.random() * responses.length)]
			var newbal = parseInt(result.bal) + response.amount;
			db.set(message.author.id, 'bal', newbal)



			embeds.blankEmbed(message, `<@${message.author.id}>, ${response.message}`);

		}
	},
};
