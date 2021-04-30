
const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')


module.exports = {
	name: 'shop',
	description: 'View the shop or the details of an item',
	aliases: ['store'],
	usage: '`a.shop <item>`, `a.shop`',
	category: 'economy',

	async execute(message, args) {

		const result = await db.fetch(message.author.id)
		if (!parseInt(args[0]) && args[0]) {
			var item = message.client.items.get(item) || message.client.items.find(cmd => cmd.aliases && cmd.aliases.includes(item));
			if (!item) return shop(0)
			embeds.defaultEmbed(
				message,
				item.displayName + ` (${result[name]})`,
				`${item.description}
				Item: ${item.name}
				Price: ${item.price}`
			)
		}

		function shop(page) {

		}

	},
};
















