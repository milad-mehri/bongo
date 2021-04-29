const db = require('../../db.js');
const Discord = require('discord.js');
const itemSchema = require('../../schemas/item-schema')
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')


module.exports = {
	name: 'balance',
	description: 'View your balance or the mentioned users balance',
	aliases: ['bal', 'wallet'],
	usage: '`a.balance`, `a.bal @user`',
	category: 'economy',

	async execute(message, args) {


		//Check if user is mentioned
		if (!message.mentions.users.size) {

			//Fetch user from database
			const result = await db.fetch(message.author.id)

			var invworth = 0

			//Cycle through all items to calculate inventory worth
			var allItems = itemSchema.find({}).lean().exec(function (err, docs) {

				for (var i = 0; i < docs.length; i++) {
					invworth += result[docs[i].shopid] * docs[i].price;
					if (i === docs.length - 1)
						embeds.defaultEmbed(
							message,
							`${message.author.username}'s Balance`,
							`:bank:  Balance: [$${functions.comma(result.bal)}](https://top.gg/bot/780943575394942987)\n
						:file_cabinet:  Inventory: [$${functions.comma(invworth)}](https://top.gg/bot/780943575394942987)\n
						:globe_with_meridians:  Net worth (total): [$${functions.comma(result.bal + invworth)}](https://top.gg/bot/780943575394942987)`
						);
				}
			})

		} else {
			var user = message.mentions.users.first();
			const result = await db.fetch(user.id)
			var invworth = 0

			var allItems = itemSchema.find({}).lean().exec(function (err, docs) {
				var i;
				for (i = 0; i < docs.length; i++) {
					invworth += result[docs[i].shopid] * docs[i].price;
					if (i === docs.length - 1)
						embeds.defaultEmbed(
							message,
							`${user.username}'s Balance`,
							`:bank:  Balance: [$${functions.comma(result.bal)}](https://top.gg/bot/780943575394942987)\n
						:file_cabinet:  Inventory: [$${functions.comma(invworth)}](https://top.gg/bot/780943575394942987)\n
						:globe_with_meridians:  Net worth (total): [$${functions.comma(result.bal + invworth)}](https://top.gg/bot/780943575394942987)`
						);
				}
			})

		}







	},
};
















