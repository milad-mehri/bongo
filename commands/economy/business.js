const db = require('../../db.js');
const Discord = require('discord.js');
const itemSchema = require('../../schemas/item-schema')
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')


module.exports = {
	name: 'business',
	description: 'View and manage your business!',
	usage: '`a.business`, `a.business open <type>`, `a.business claim`, `a.business refill <amount>`, `a.business list`',
	category: 'economy',

	async execute(message, args) {
		var result = await db.fetch(message.author.id)
		var stock = result.busstock
		var busbal = result.busbal
		if (args[0] === 'list') {
			return embeds.defaultEmbed(message, 'Buisnesses', ' :convenience_store:  Fish shop-  Sell fish for some money\nStartup price - :fish: 10 fish', 'Do a.business open (type)')
		} else if (args[0] === 'open') {
			if (result.business) return embeds.errorEmbed(message, 'You **already have** a business!')
			if (!args[1]) return embeds.errorEmbed(message, 'You have to say** what kind of business you want** to open, **do** `a.business list`')


			if (args[1].toLowerCase() === 'fish') {
				if (result.common < 10) return embeds.errorEmbed(message, 'You **don\'t have enough **fish')
				await db.set(message.author.id, 'business', 'Fish Shop')
				await db.set(message.author.id, 'common', result.common - 10)
				await db.set(message.author.id, 'busbal', 100)
				await db.set(message.author.id, 'busstock', 10)
				embeds.successEmbed(message, 'business **created!** Do **a.business** to view your business')


			}
		} else if (args[0] === 'claim') {
			if (!result.business) return embeds.errorEmbed(message, 'You **don\'t have a business**, do `a.business list` to get one')
			if (result.busbal < 1) return embeds.errorEmbed(message, 'You can\'t **claim nothing**. :laughing: ')
			await db.set(message.author.id, 'bal', result.bal + result.busbal)
			await db.set(message.author.id, 'busbal', 0)
			embeds.successEmbed(message, 'Claimed **$' + result.busbal + '** from your business')


		} else if (args[0] === 'restock' || args[0] === 'refill' || args[0] === 'fill') {
			if (!result.business) return embeds.errorEmbed(message, 'You** don\'t have a business**, do `a.business list` to get one')
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
					return embeds.errorEmbed(message, 'this is **too many** fish for your stock, the most you can put is **' + ((10 - stock)) + '**.')
				} else {
					var newa = stock + a
					embeds.successEmbed(message, 'Your stock is now **filled **' + newa + '/10' + '**')
					await db.set(message.author.id, 'busstock', newa)
					await db.set(message.author.id, 'common', result.common - input)

				}



			}



		} else {
			if (!result.business) return message.reply('You **don\'t have a business**, do `a.business list` to get one')
			var a = '■'.repeat(stock) + '□'.repeat(10 - stock)
			embeds.defaultEmbed(message, message.author.username + '\'s ' + result.business, `:convenience_store:  Fish shop\n\nStock: [${a}](https://top.gg/bot/780943575394942987)\nBusiness Balance: $${functions.comma(busbal)}`, 'a.business refill | a.business claim')

		}







	},
};
















