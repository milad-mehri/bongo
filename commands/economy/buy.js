const db = require('../../db.js');
const Discord = require('discord.js');
const itemSchema = require('../../schemas/item-schema')
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')

module.exports = {
	name: 'buy',
	description: 'Buy an item from the shop!',
	usage: '`a.buy <item>`',
  category: 'economy',


	async execute(message, args) {


		var result = await db.fetch(message.author.id)
		if (args[0] === undefined && args[1] === undefined) {
			return message.reply('what are you gonna buy??')
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
			return embeds.errorEmbed(message, 'What are you trying to buy?')
		}
		if (item === 'fishing') item = 'rod'
		if (item === 'commonfish') item = 'common'
		if (item === 'fish') item = 'common'
		if (item === 'commonfish') item = 'common'
		if (isNaN(ammount)) ammount = 1
		
		if (!item[item.length] == "s") {
			item = item.slice(0, -1)
			// remove s from string
		}


		var allItems = await itemSchema.find({ 'shopid': item }).lean().exec(async function(err, docs) {
			if(!docs[0]) return embeds.errorEmbed(message, 'This item isn\'t in the shop!')
			if (err || !(docs[0].inshop)) return embed.errorEmbed(message, 'This item isn\'t in the shop!')


			let bal = result.bal
			let invitem = result[item]
			var itemobject = docs[0]
			console.log(docs[0])
			var price = ((itemobject.price - itemobject.sale) * ammount)
			console.log(result[item] + ':' + ammount)
			if (item === 'ball') {
				if ((parseInt(result[item]) + parseInt(ammount)) > 50) {
					return embeds.errorEmbed(message, 'You cant have more than 50 balls!')
				}
			}

			if (price > bal) return embeds.errorEmbed(message,'you are to broke to buy this, try begging.');


			console.log(item)

			var newbal = bal - price
			await db.set(message.author.id, 'bal', newbal)
			await db.set(message.author.id, [item], result[item] + parseInt(ammount))
			embeds.defaultEmbed(message,'Order purchased', `You bought ${functions.comma(ammount)} ${itemobject.itemname}s for ${functions.comma(price)} and you now have ${functions.comma(parseInt(result[item]) + parseInt(ammount))} ${itemobject.itemname}s and $${functions.comma(newbal)} coins.`)


		})

	},
};

