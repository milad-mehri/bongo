
const itemSchema = require('../../schemas/item-schema')
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

		var over = false
		const result = await db.fetch(message.author.id)
		if (isNaN(args[0]) && args[0]) {
			var allItems = await itemSchema.find({ 'shopid': args[0] }).lean().exec(async function (err, docs) {
				if (err) page = 1


				var itemobject = docs[0]
				over = true
				return embeds.defaultEmbed(message, itemobject.itemname + ' (' + result[args[0]] + ')',
					`${itemobject.description}\n\nIcon : ${itemobject.emoji}\nValue : `
					+ '`' + `${functions.comma(itemobject.price)}` + '`' + `\nSell price : ` +
					'`' + `${functions.comma(itemobject.price * 0.10)}` + '`' + `\nShop ID : ` +
					'`' + `${itemobject.shopid}` + '`' + `\nIn shop? : ` + '`'
					+ `${itemobject.inshop}` + '`', 'Bongo bot')


			})
		} else {
			if (!args[0] || isNaN(args[0]) || parseInt(args[0]) === 1) {
				var page = 1
			} else {
				var page = parseInt(args[0])
			}

			var pagea = []

			var allItems = await itemSchema.find({}).lean().sort({ "sale": -1 }).exec(function (err, docs) {



				var i;
				for (i = 0; i < docs.length; i++) {
					var item = docs[i]
					if (item.inshop) {
						if (i === 0) {
							pagea.push('\n' + docs[i].description + ' - ID `' + docs[i].shopid + '`')

						} else {

							pagea.push(docs[i].emoji + ' **' + docs[i].itemname + '** - ' + functions.comma(parseInt(docs[i].price) - docs[i].sale) + '\n' + docs[i].description + ' - ID `' + docs[i].shopid + '`')

						}

					}

				}

				if (page === 1) {
					embeds.defaultEmbed(message, '**SALE** ' + docs[0].emoji + ' **' + docs[0].itemname + '** - ' + functions.comma(parseInt(docs[0].price) - docs[0].sale) + ' ~~' + functions.comma(parseInt(docs[0].price)) + '~~', functions.chunkArray(pagea, 7)[0].join('\n\n'),'blue',  `Your balance: ${functions.comma(result.bal)}\n\nPage ${page} of ${functions.chunkArray(pagea, 7).length}`)
				} else {
					if (functions.chunkArray(pagea, 7)[page - 1]) {
						var newpage = functions.chunkArray(pagea, 7)[page - 1].join('\n\n')

						embeds.defaultEmbed(message, 'Bongo Shop', newpage, 'blue', `Your balance: ${functions.comma(result.bal)}\nPage ${page} of ${functions.chunkArray(pagea, 7).length}`)
					} else {
						return message.reply('this page doesnt exist breh')
					}
				}

			})

		}

	},
};
















