const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions');


module.exports = {
	name: 'business',
	description: 'View and manage your business!',
	usage: '`a.business`, `a.business open <type>`, `a.business claim`, `a.business refill <amount>`, `a.business list`',
	category: 'economy',

	async execute(message, args) {
		var result = await db.fetch(message.author.id)
		var stock = result.businessObject.stock || 0
		var busbal = result.businessObject.bal || 0
		if (args[0] === 'list') {
			return embeds.defaultEmbed(message, 'Buisnesses', ':convenience_store:  Fish shop-  Sell **fish **for some money\nStartup price - :fish: 10 fish\n\n:department_store:  Rare Fish shop-  Sell **rare fish **for **more **money\nStartup price - :tropical_fish: 10 rare fish', 'blue', 'Do a.business open (type)')
		} else if (args[0] === 'open') {
			if (result.businessObject.name) return embeds.errorEmbed(message, 'You **already have** a business!')
			if (!args[1]) return embeds.errorEmbed(message, 'You have to say** what kind of business you want** to open, **do** `a.business list`')


			if (args[1].toLowerCase() === 'fish') {
				if (result.items.common < 10) return embeds.errorEmbed(message, 'You **don\'t have enough **fish')
				result.businessObject.name = 'Fish Shop'
				result.businessObject.bal = 100
				result.businessObject.stock = 10

				result.items.common = result.items.common - 10

				await db.set(message.author.id, 'items', result.items)
				await db.set(message.author.id, 'businessObject', result.businessObject)
				embeds.successEmbed(message, 'business **created!** Do **a.business** to view your business')



			}


			if (args[1].toLowerCase() === 'rare') {
				if (result.items.rare < 10) return embeds.errorEmbed(message, 'You **don\'t have enough **fish')
				result.businessObject.name = 'Rare Fish Shop'
				result.businessObject.bal = 100
				result.businessObject.stock = 10

				result.items.rare = result.items.rare - 10

				await db.set(message.author.id, 'items', result.items)
				await db.set(message.author.id, 'businessObject', result.businessObject)
				embeds.successEmbed(message, 'business **created!** Do **a.business** to view your business')


			}
		} else if (args[0] === 'claim') {
			if (!result.businessObject.name) return embeds.errorEmbed(message, 'You **don\'t have a business**, do `a.business list` to get one')
			if (result.businessObject.bal < 1) return embeds.errorEmbed(message, 'You can\'t **claim nothing**. :laughing: ')


			await db.set(message.author.id, 'bal', result.bal + result.businessObject.bal)
			var amountClaimed = result.businessObject.bal
			result.businessObject.bal = 0
			await db.set(message.author.id, 'businessObject', result.businessObject.bal)
			embeds.successEmbed(message, 'Claimed **$' + amountClaimed + '** from your business')


		} else if (args[0] === 'restock' || args[0] === 'refill' || args[0] === 'fill') {

			if (!result.businessObject.name) return embeds.errorEmbed(message, 'You** don\'t have a business**, do `a.business list` to get one')
			if (result.businessObject.name === "Rare Fish Shop") {
				var type = 'rare'
			} else if (result.businessObject.name === "Fish Shop") {
				var type = 'common'
			}
			var input = parseInt(args[1])
			if (stock === 10) {
				return embeds.errorEmbed(message, 'You already **have full stock**')
			} else if (isNaN(input) || !input) {
				return embeds.errorEmbed(message, 'Please **input how many** fish you want to stock.')
			} else if (result.items[type] < input || input < 1) {
				return embeds.errorEmbed(message, 'You **don\'t have enough** fish!')

			} else {
				var a = Math.floor(input)
				if (stock + a > 10) {
					return embeds.errorEmbed(message, 'this is **too many** fish for your stock, the most you can put is **' + ((10 - stock)) + '.')
				} else {
					var newa = stock + a

					result.businessObject.stock = newa

					result.items[type] = result.items[type] - input

					embeds.successEmbed(message, 'Your stock is now **filled **' + newa + '/10' + '**')

					await db.set(message.author.id, 'businessObject', result.businessObject)
					await db.set(message.author.id, 'items', result.items)

				}



			}



		} else if (args[0] === "delete") {
			delete result.businessObject.name 
			delete result.businessObject.bal
	//		delete result.businessObject.stock

			embeds.blankEmbed(message, 'Your business was **deleted**.')

			await db.set(message.author.id, 'businessObject', {})
		} else {
			console.log(result.businessObject.name)
			if (!result.businessObject.name) return message.reply('You **don\'t have a business**, do `a.business list` to get one')
			var a = '■'.repeat(stock) + '□'.repeat(10 - stock)
			embeds.defaultEmbed(message, message.author.username + '\'s ' + result.businessObject.name, `:convenience_store:  ${result.businessObject.name}\n\nStock: [${a}](https://top.gg/bot/780943575394942987)\nBusiness Balance: $${functions.comma(busbal)}`, 'a.business refill | a.business claim')

		}
	}
}


/*const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')


module.exports = {
	name: 'business',
	description: 'View and manage your business!',
	usage: '`a.business`, `a.business open <type>`, `a.business claim`, `a.business refill <amount>`, `a.business list`',
	category: 'economy',

	async execute(message, args) {
		var result = await db.fetch(message.author.id)
		var stock = result.businessObject.stock || 0
		var busbal = result.businessObject.bal || 0
		if (args[0] === 'list') {
			return embeds.defaultEmbed(message, 'Buisnesses', ' :convenience_store:  Fish shop-  Sell fish for some money\nStartup price - :fish: 10 fish', 'Do a.business open (type)')
		} else if (args[0] === 'open') {
			if (result.businessObject.name) return embeds.errorEmbed(message, 'You **already have** a business!')
			if (!args[1]) return embeds.errorEmbed(message, 'You have to say** what kind of business you want** to open, **do** `a.business list`')


			if (args[1].toLowerCase() === 'fish') {
				if (result.common < 10) return embeds.errorEmbed(message, 'You **don\'t have enough **fish')
				result.businessObject.name = 'Fish Shop'
				result.businessObject.bal = 100
				result.businessObject.stock = 10

				result.common = result.common - 10

				await db.set(message.author.id, 'items', result.common)
				await db.set(message.author.id, 'businessObject', result.businessObject)
				embeds.successEmbed(message, 'business **created!** Do **a.business** to view your business')


			}
		} else if (args[0] === 'claim') {
			if (!result.businessObject.name) return embeds.errorEmbed(message, 'You **don\'t have a business**, do `a.business list` to get one')
			if (result.businessObject.bal < 1) return embeds.errorEmbed(message, 'You can\'t **claim nothing**. :laughing: ')


			await db.set(message.author.id, 'bal', result.bal + result.businessObject.bal)
			var amountClaimed = result.businessObject.bal
			result.businessObject.bal = 0
			await db.set(message.author.id, 'businessObject', result.businessObject.bal)
			embeds.successEmbed(message, 'Claimed **$' + amountClaimed + '** from your business')


		} else if (args[0] === 'restock' || args[0] === 'refill' || args[0] === 'fill') {
			if (!result.businessObject.name) return embeds.errorEmbed(message, 'You** don\'t have a business**, do `a.business list` to get one')
			var input = parseInt(args[1])
			if (stock === 10) {
				return embeds.errorEmbed(message, 'You already **have full stock**')
			} else if (isNaN(input) || !input) {
				return embeds.errorEmbed(message, 'Please **input how many** fish you want to stock.')
			} else if (result.common < input || input < 1) {
				return embeds.errorEmbed(message, 'You **don\'t have enough** fish!')

			} else {
				var a = Math.floor(input)
				if (stock + a > 10) {
					return embeds.errorEmbed(message, 'this is **too many** fish for your stock, the most you can put is **' + ((10 - stock)) + '.')
				} else {
					var newa = stock + a

					result.businessObject.stock = newa
					result.common = result.common - input

					embeds.successEmbed(message, 'Your stock is now **filled **' + newa + '/10' + '**')

					await db.set(message.author.id, 'businessObject', result.businessObject)
					await db.set(message.author.id, 'item', result.item)

				}



			}



		} else {
			console.log(result.businessObject.name)
			if (!result.businessObject.name) return message.reply('You **don\'t have a business**, do `a.business list` to get one')
			var a = '■'.repeat(stock) + '□'.repeat(10 - stock)
			embeds.defaultEmbed(message, message.author.username + '\'s ' + result.businessObject.name, `:convenience_store:  Fish shop\n\nStock: [${a}](https://top.gg/bot/780943575394942987)\nBusiness Balance: $${functions.comma(busbal)}`, 'a.business refill | a.business claim')

		}
	}
}*/