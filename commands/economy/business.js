const db = require('../../db.js');
const Discord = require('discord.js');
const itemSchema = require('../../schemas/item-schema')


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
			return re('Buisnesses', ' :convenience_store:  Fish shop-  Sell fish for some money\nStartup price - :fish: 10 fish', 'Do a.business open (type)')
		} else if (args[0] === 'open') {
			if (result.business) return message.reply('You already have a business!')
			if (!args[1]) return message.reply('You have to say what kind of business you want to open, do `a.business list`')


			if (args[1].toLowerCase() === 'fish') {
				if (result.common < 10) return message.reply('You dont have enough fish')
				await db.set(message.author.id, 'business', 'Fish Shop')
				await db.set(message.author.id, 'common', result.common - 10)
				await db.set(message.author.id, 'busbal', 100)
				await db.set(message.author.id, 'busstock', 10)
				message.reply('business created! Do a.business to view your business')


			}
		} else if (args[0] === 'claim') {
			if (!result.business) return message.reply('You dont have a business, do `a.business list` to get one')
			await db.set(message.author.id, 'bal', result.bal + result.busbal)
			await db.set(message.author.id, 'busbal', 0)
			message.reply('Claimed $' + result.busbal + ' from your business')


		} else if (args[0] === 'restock' || args[0] === 'refill') {
			if (!result.business) return message.reply('You dont have a business, do `a.business list` to get one')
			var input = parseInt(args[1])
			if (stock === 10) {
				return message.reply('You already have full stock')
			} else if (isNaN(input) || !input) {
				return message.reply('please input how many fish you want to put in stock')
			} else if (result.common < input || input < 1) {
				return message.reply('you dont have enough fish')

			} else {
				var a = Math.floor(input)
				if (stock + a > 10) {
					return message.reply('this is too many fish for your stock, the most you can put is ' + ((10 - stock)))
				} else {
					var newa = stock + a
					message.reply('Your stock is now filled ' + newa + '/10')
					await db.set(message.author.id, 'busstock', newa)
					await db.set(message.author.id, 'common', result.common - input)

				}



			}



		} else {
			if (!result.business) return message.reply('You dont have a business, do `a.business list` to get one')
			var a = '■'.repeat(stock) + '□'.repeat(10 - stock)
			re(message.author.username + '\'s ' + result.business, `:convenience_store:  Fish shop\n\nStock: [${a}](https://top.gg/bot/780943575394942987)\nBusiness Balance: $${busbal}`, 'a.business refill | a.business claim')

		}






		function comma(number) {
			var i = number.toString();
			i = i.split("").reverse();
			i.forEach((item, index) => {
				if (index % 3 == 0) i[index] = i[index] + ",";
			});
			i[0] = i[0][0];
			return i.reverse().join("");
		}

		function re(a, b, c) {//embed function
			const embed = new Discord.MessageEmbed()
				// Set the title of the field
				.setTitle(a)
				// Set the color of the embed
				.setColor('6FA8DC')
				// Set the main content of the embed
				.setDescription(b)
				.setFooter(c)

			// Send the embed to the same channel as the message
			message.channel.send(embed);
		}





	},
};
















