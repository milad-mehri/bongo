
const itemSchema = require('../../schemas/item-schema')
const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'shop',
	description: 'View the shop or the details of an item',
	aliases: ['store'],
	usage: '`a.shop <item>`, `a.shop`',
  category: 'economy',

	async execute(message, args) {
		function comma(number) {
			var i = number.toString();
			i = i.split("").reverse();
			i.forEach((item, index) => {
				if (index % 3 == 0) i[index] = i[index] + ",";
			});
			i[0] = i[0][0];
			return i.reverse().join("");
		}
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
		var over = false
		const result = await db.fetch(message.author.id)
		if (isNaN(args[0]) && args[0]) {
			var allItems = await itemSchema.find({ 'shopid': args[0] }).lean().exec(async function(err, docs) {
				if (err) page = 1


				var itemobject = docs[0]
				over = true
				return re(itemobject.itemname + ' (' + result[args[0]] + ')',
					`${itemobject.description}\n\nIcon : ${itemobject.emoji}\nValue : `
					+ '`' + `${comma(itemobject.price)}` + '`' + `\nSell price : ` +
					'`' + `${comma(itemobject.price * 0.10)}` + '`' + `\nShop ID : ` +
					'`' + `${itemobject.shopid}` + '`' + `\nIn shop? : ` + '`'
					+ `${itemobject.inshop}` + '`', 'Bongo bot')


			})
		} else {
			if (!args[0] || isNaN(args[0]) || parseInt(args[0]) === 1) {
				var page = 1
			} else {
				var page = parseInt(args[0])
			}

			//::four_leaf_clover:  **Clover**- 15,000 - Tool\nIncrease gambling luck - ID `clover`', `Your balance: ${result.bal}`)
			/*
			var item = await db.shop('Ball', 'ball','Generate 1-750 coins per ball',75000, ':crystal_ball:')
			var itemb = await db.shop('Shield', 'shield','Decrease the chances of getting robbed',7000, ':shield:')
			var itemc = await db.shop('Medal', 'medal','Increase your hourly, daily and monthly coins (dont stack)',1000000, ':medal:')
			var itemd = await db.shop('Donut', 'donut','Get 50-115 coins per each donut you eat',100, ':doughnut:')
			var iteme = await db.shop('Small Diamond', 'diamond','Flex on the slightly poorer people',10000000, ':small_blue_diamond:')
			var itemf = await db.shop('Bleach', 'bleach','Risk your life for some money?',10000, ':baby_bottle:')
			var itemg = await db.shop('Clover', 'clover','Increase gambling luck',15000, ':four_leaf_clover:')
			*/


			var pagea = []

			var allItems = await itemSchema.find({}).lean().sort({ "sale": -1 }).exec(function(err, docs) {



				var i;
				for (i = 0; i < docs.length; i++) {
					var item = docs[i]
					if (item.inshop) {
						if (i === 0) {
							pagea.push('\n' + docs[i].description + ' - ID `' + docs[i].shopid + '`')

						} else {

							pagea.push(docs[i].emoji + ' **' + docs[i].itemname + '** - ' + comma(parseInt(docs[i].price) - docs[i].sale) + '\n' + docs[i].description + ' - ID `' + docs[i].shopid + '`')

						}

					}

				}




				if (page === 1) {
					re('**SALE** ' + docs[0].emoji + ' **' + docs[0].itemname + '** - ' + comma(parseInt(docs[0].price) - docs[0].sale) + ' ~~' + comma(parseInt(docs[0].price)) + '~~', chunkArray(pagea, 7)[0].join('\n\n'), `Your balance: ${comma(result.bal)}\n\nPage ${page} of ${chunkArray(pagea, 7).length}`)
				} else {
					if (chunkArray(pagea, 7)[page - 1]) {
						var newpage = chunkArray(pagea, 7)[page - 1].join('\n\n')

						re('Bongo Shop', newpage, `Your balance: ${comma(result.bal)}\nPage ${page} of ${chunkArray(pagea, 7).length}`)
					} else {
						return message.reply('this page doesnt exist breh')
					}
				}




			})

		}

	},
};
















