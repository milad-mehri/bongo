const db = require('../../db.js');
const Discord = require('discord.js');
const itemSchema = require('../../schemas/item-schema')
const embeds = require('../../functions/embeds')

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

		let bal = result.bal


		var item = args[0]
		var ammount = args[1]
		if (args[1] === undefined) {

			ammount = 1
			item = args[0]
		}
		if (isNaN(parseInt(ammount))) {
			item = args[1]
			ammount = args[0]

		}


		item = item.toLowerCase()


		if (parseInt(ammount) < 1) {
			return embeds.errorEmbed(message, 'You have to sell something.')
		}
		if (item === 'fishing') {
			item = 'rod'
		}
		if (item === 'commonfish') {
			item = 'common'
		}
		if (item === 'fish') {
			item = 'common'
		}

		if (item === 'commonfish') {
			item = 'common'
		}
		if (isNaN(ammount)) ammount = 1
		if (!item[item.length] == "s") {
			item = item.slice(0, -1)
			// remove s from string
		}

		if (result[item] < ammount) return embeds.errorEmbed('You **don\'t have enough** of this item')
		var allItems = await itemSchema.find({ 'shopid': item }).lean().exec(async function(err, docs) {
			if (err) return embeds.blankEmbed(message,'This item isnt in the shop!')


			let bal = result.bal
			let invitem = result[item]
			var itemobject = docs[0]
			var price = ((itemobject.price - itemobject.sale) * ammount)
	

			var newbal = bal + price * 0.10
			await db.set(message.author.id, 'bal', newbal)
			await db.set(message.author.id, [item], result[item] - parseInt(ammount))
			embeds.defaultEmbed('Package returned', `You sold ${ammount} ${itemobject.itemname}s for ${price * 0.10} and you now have ${parseInt(result[item]) - parseInt(ammount)} ${itemobject.itemname}s and $${newbal} coins.`)


		})

	},
};

