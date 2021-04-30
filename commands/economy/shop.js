
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
		if (!parseInt(args[0])) {
			var item = message.client.items.get(args[0]) || message.client.items.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
			if (!item) return shop(1)
			embeds.defaultEmbed(
				message,
				item.displayName + ` (${result[item.name]})`,
				`${item.description}

				**Icon**: ${item.emoji}
				**Item**: ${item.displayName}
				**Price**: ${item.price}`
			)
		}

		function shop(page) {
			var shop = []
			message.client.items.forEach( item => {
			
				if(item.inshop){
					console.log(item.name)
					shop.push(
						`${item.emoji}  ${item.displayName}  -  $${functions.comma(item.price)}
						${item.description}`
					)
				}
			})
			var pages = functions.chunkArray(shop, 6)
			embeds.defaultEmbed(message, 'Shop', pages[page - 1].join("\n\n") , blue, `Page ${args[0]} of ${pages.length}.` )

						
		}

	},
};
















