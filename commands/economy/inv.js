const db = require('../../db.js');
const Discord = require('discord.js');
const itemSchema = require('../../schemas/item-schema')


module.exports = {
	name: 'inventory',
	description: 'View your inventory or the inventory of a mentioned user',
	aliases: ['inv'],
	usage: '`a.inv`, `a.inv @user`',
  category: 'economy',

	async execute(message, args) {
		function chunkArray(myArray, chunk_size) {
			var index = 0;
			var arrayLength = myArray.length;
			var tempArray = [];

			for (index = 0; index < arrayLength; index += chunk_size) {
				myChunk = myArray.slice(index, index + chunk_size);
				// Do something if you want with the group
				tempArray.push(myChunk);
			}

			return tempArray;
		}

		function re(a, b, c) {//embed function
			const embed = new Discord.MessageEmbed()
				// Set the title of the field
				.setTitle(a)
				// Set the color of the embed
				.setColor('6FA8DC')
				// Set the main content of the embed
				.setDescription(b)
				.setFooter(c);


			// Send the embed to the same channel as the message
			message.channel.send(embed);
		}

		if (!message.mentions.users.size) {

			if (!args[0] || isNaN((args[0])) || parseInt(args[0]) === 1) {
				var page = 1
			} else {
				var page = parseInt(args[0])
			}
		} else {


			if (!args[1] || isNaN((args[1])) || parseInt(args[1]) === 1) {
				var page = 1
			} else {
				var page = parseInt(args[1])
			}
		}
		if (!message.mentions.users.size) {

			const result = await db.fetch(message.author.id)
			var items = []
			var allItems = await itemSchema.find({}).lean().exec(function(err, docs) {
				docs.forEach((item, index) => {
					console.log(result[item.shopid])
					//   if (result[item.shopid]) {
					if (parseInt(result[item.shopid]) > 0) {
						items.push(`\n${result[item.shopid]} - ${item.itemname}(s)  ${item.emoji} `)
						//     }
					}
				})

				if (items.length === 0) {
					re('Inventory', 'Nothing to see here.')
				} else {
					if (chunkArray(items, 7)[page - 1]) {
						return re('Inventory', chunkArray(items, 7)[page - 1], `\nPage ${page} out of ${chunkArray(items, 7).length}`)
					} else {
						return message.reply('this page doesnt exist...')
					}

				}
			})
		} else {
			var member = message.mentions.members.first();

			const result = await db.fetch(member.id)

			var items = []
			var allItems = await itemSchema.find({}).lean().exec(function(err, docs) {
				docs.forEach((item, index) => {
					/// if (result.item) {
					if (parseInt(result[item.shopid]) > 0) {
						items.push(`\n${result[item.shopid]} - ${item.itemname}(s)  ${item.emoji} `)
					}
					//  }
				})



				if (items.length === 0) {
					re('Inventory', 'Nothing to see here.')
				} else {
					if (chunkArray(items, 7)[page - 1]) {
						return re('Inventory', chunkArray(items, 7)[page - 1], `Page ${page} out of ${chunkArray(items, 7).length}`)
					} else {
						return message.reply('this page doesnt exist...')
					}

				}
			})
		}
	},
};
