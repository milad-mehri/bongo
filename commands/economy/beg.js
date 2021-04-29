const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const { responses } = require('../../helpers/beg.json')

module.exports = {
	name: 'beg',
	description: 'Beg randoms for money',
	usage: '`a.beg`',
	category: 'economy',
	cooldown: 10,

	async execute(message) {
		var result = await db.fetch(message.author.id)

		var response = responses[Math.floor(Math.random() * responses.length)]
		var newbal = parseInt(result.bal) + response.amount;
		db.set(message.author.id, 'bal', newbal)

		embeds.blankEmbed(message, `<@${message.author.id}>, ${response.message}`);
	},
};
