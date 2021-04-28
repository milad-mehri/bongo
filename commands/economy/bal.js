const db = require('../../db.js');
const Discord = require('discord.js');
const itemSchema = require('../../schemas/item-schema')


module.exports = {
	name: 'balance',
	description: 'View your balance or the mentioned users balance',
	aliases: ['bal', 'wallet'],
	usage: '`a.balance`, `a.bal @user`',
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
		/*
		async function invWorth(result){
				
			var invworth = 0
			var allItems = await itemSchema.find({}).lean().exec(function (err, docs) {
				var i;
				for(i = 0; i < docs.length ; i ++){
					invworth+= result[docs[i].shopid] * docs[i].price
				//	console.log(invworth)
					//console.log(docs[i].shopid)
					
					if(i === docs.length-1) return invworth
		
				}
			})
		}*/
		if (!message.mentions.users.size) {
			const result = await db.fetch(message.author.id)
			var invworth = 0
			var allItems = await itemSchema.find({}).lean().exec(function(err, docs) {
				var i;
				for (i = 0; i < docs.length; i++) {
					invworth += result[docs[i].shopid] * docs[i].price
					if (i === docs.length - 1) {
						console.log('INV : ' + invworth)
						re(message.author.username+ `'s Balance`, ':bank:  Balance: [$' + comma(result.bal) + '](https://top.gg/bot/780943575394942987)\n\n' + ':file_cabinet:  Inventory: [$' + comma(invworth) + '](https://top.gg/bot/780943575394942987)\n\n' + ':globe_with_meridians:  Net worth (total): [$' + comma(result.bal + invworth) + '](https://top.gg/bot/780943575394942987)');
					}

				}
			})
			//	 var invworth = await invWorth(result)

		} else {
			var balcheck = message.mentions.users.first();
			const result = await db.fetch(balcheck.id)
			var invworth = 0
			var allItems = await itemSchema.find({}).lean().exec(function(err, docs) {
				var i;
				for (i = 0; i < docs.length; i++) {
					invworth += result[docs[i].shopid] * docs[i].price
					if (i === docs.length - 1) {
						console.log('INV : ' + invworth)
						re(balcheck.username + `'s Balance`, ':bank:  Balance: [$' + comma(result.bal) + '](https://top.gg/bot/780943575394942987)\n\n' + ':file_cabinet:  Inventory: [$' + comma(invworth) + '](https://top.gg/bot/780943575394942987)\n\n' + 'Net worth (total): [$' + comma(result.bal + invworth) + '](https://top.gg/bot/780943575394942987)');
					}

				}
			})

		}







	},
};
















