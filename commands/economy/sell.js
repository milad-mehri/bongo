const db = require('../../db.js');
const Discord = require('discord.js');
const itemSchema = require('../../schemas/item-schema')

module.exports = {
	name: 'sell',
	description: 'Sell an item from your inventory',
	usage: '`a.sell <item>`',
category: 'economy',
	async execute(message, args) {

		function re(a, b) {//embed function
			const embed = new Discord.MessageEmbed()
				// Set the title of the field
				.setTitle(a)
				// Set the color of the embed
				.setColor('6FA8DC')
				// Set the main content of the embed
				.setDescription(b);

			// Send the embed to the same channel as the message
			message.channel.send(embed);
		}

		var result = await db.fetch(message.author.id)
		if (args[0] === undefined && args[1] === undefined) {
			return message.reply('what are you gonna sell??')
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
			return message.reply(' you cant sell negative items')
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

		if (result[item] < ammount) return message.reply('you dont have enough of this item')
		var allItems = await itemSchema.find({ 'shopid': item }).lean().exec(async function(err, docs) {
			if (err) return message.channel.send('this item isnt in the shop!')


			let bal = result.bal
			let invitem = result[item]
			var itemobject = docs[0]
			console.log(docs[0])
			var price = ((itemobject.price - itemobject.sale) * ammount)
			console.log(result[item] + ':' + ammount)


			console.log(item)


			var newbal = bal + price * 0.10
			await db.set(message.author.id, 'bal', newbal)
			await db.set(message.author.id, [item], result[item] - parseInt(ammount))
			re('Package returned', `You sold ${ammount} ${itemobject.itemname}s for ${price * 0.10} and you now have ${parseInt(result[item]) - parseInt(ammount)} ${itemobject.itemname}s and $${newbal} coins.`)


		})

	},
};

