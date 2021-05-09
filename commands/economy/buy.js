const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')

module.exports = {
	name: 'buy',
	description: 'Buy an item from the shop!',
	usage: '`a.buy <item>`',
	category: 'economy',


	async execute(message, args) {


		var result = await db.fetch(message.author.id)


		if (!args[0]) {
			return embeds.errorEmbed(message, 'What are you trying to buy?')
		}

		var item = args[0]
		var amount = args[1]
		if (args[1] === undefined) {

			amount = 1
			item = args[0]
		}
		if (isNaN(parseInt(amount))) {
			item = args[1]
			amount = args[0]

		}


		item = item.toLowerCase()


		if (parseInt(amount) < 1) {
			return embeds.errorEmbed(message, 'What are you trying to buy?')
		}

		if (isNaN(amount)) amount = 1


		item = (message.client.items.get(item) || message.client.items.find(cmd => cmd.aliases && cmd.aliases.includes(item)) || null)
		if (!item) return embeds.errorEmbed(message, 'This item isn\'t in the shop!')
		if (!(item.inshop)) return embed.errorEmbed(message, 'This item isn\'t in the shop!')


		let bal = result.bal
		var price = parseInt(item.price * amount)



		if (item.name === 'ball') {
			if (result.items[item.name] + parseInt(amount) > 50) {
				console.log(result.items[item.name] + parseInt(amount))
				return embeds.errorEmbed(message, 'You cant have more than 50 balls!')
			}
		}

		if (price > bal) return embeds.errorEmbed(message, 'You are to broke to buy this, try begging.');

		result.items[item.name] = result.items[item.name] + parseInt(amount)

		await db.set(message.author.id, 'bal', bal - price)
		await db.set(message.author.id, "items", result.items)
		embeds.defaultEmbed(message, 'Order purchased', `You bought **${functions.comma(amount)} ${item.displayName}'s** for **${functions.comma(price)}** and you now have **${functions.comma(parseInt(result.items[item.name]))} ${item.displayName}'s** and **$${functions.comma(bal - price)}** coins.`)


	},
};

