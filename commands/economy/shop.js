
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
		if (!args[0]) return shop(1)
		if (!parseInt(args[0])) {

			var item = message.client.items.get(args[0].toLowerCase()) || message.client.items.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()));
			if (!item) return shop(1)
			embeds.defaultEmbed(
				message,
				item.displayName + ` (${result[item.name]})`,
				`${item.description}

				**Icon**: ${item.emoji}
				**Item**: ${item.displayName}
				**Price**: ${item.price}`
			)
		} else {
			shop(args[0].toLowerCase())
		}

		function shop(page) {
			var shop = []
			message.client.items.forEach(item => {

				if (item.inshop) {
					shop.push(
						`${item.emoji}  ${item.displayName}  -  **$${functions.comma(item.price)}**
						${item.description}`
					)
				}
			})
			var pages = functions.chunkArray(shop, 6)
			if (pages[page - 1]) {
				embeds.defaultEmbed(message, 'Shop', pages[page - 1].join("\n\n"), "blue", `Page ${page} of ${pages.length}.`)
			} else {
				return embeds.errorEmbed(message, 'This page doesn\'t exist.')
			}

		}

	},
};
















