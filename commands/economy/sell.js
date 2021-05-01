const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')

module.exports = {
	name: 'sell',
	description: 'Sell an item from your inventory',
	usage: '`a.sell <item>`',
	category: 'economy',
	async execute(message, args) {


		var result = await db.fetch(message.author.id)
		if (args[0] === undefined && args[1] === undefined) {
			return embeds.errorEmbed(message, 'You have to **say** what you **want to sell.**')
		}




		var item = args[0]
		var amount = args[1]
		if (isNaN(parseInt(args[1]))) {

			amount = 1
			item = args[0]
		}
		if (isNaN(parseInt(amount))) {
			item = args[1]
			amount = args[0]

		}


		item = item.toLowerCase()
		if(!amount) amount = 1

		if (parseInt(amount) < 1) {
			return embeds.errorEmbed(message, 'You have to sell something.')
		}
		item = (message.client.items.get(item) || message.client.items.find(cmd => cmd.aliases && cmd.aliases.includes(item)) || null)
		if (!item) return embeds.blankEmbed(message, 'This item isnt in the shop!')
		if (result.items[item.name] < amount) return embeds.errorEmbed(message,'You **don\'t have enough** of this item')




		let bal = result.bal
		var price = item.price * amount


		await db.set(message.author.id, 'bal', bal + price * 0.10)

		result.items[item] = result.items[item] - parseInt(amount)

		await db.set(message.author.id, 'items', result.items)
		embeds.defaultEmbed(message ,'Package returned', `You sold **${functions.comma(amount)} ${item.displayName}'s** for **$${functions.comma(price * 0.10)}** and you now have **${functions.comma(parseInt(result.items[item.name]))} ${item.displayName}'s** and **$${functions.comma(bal + (price * 0.10))} coins**.`)


	},
};

