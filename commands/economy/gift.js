


const db = require('../../db.js');

const Discord = require('discord.js');


module.exports = {
	name: 'gift',
	description: 'Send an item to a user!',
	usage: '`a.gift <item> @user`',
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



		var giver = message.author;
		var reciever = message.mentions.users.first();

		if (giver === reciever) {
			return message.reply(' you cant gift items to yourself..')
		}

		var a = args[0]
		var b = args[1]
		var c = args[2]

		if (undefined === c || b === undefined || a === undefined) {
			return message.reply('You are missing an argument!! Use this command like : `a.gift (number) (item) (@)`')
		}


		if (isNaN(parseInt(a)) && isNaN(parseInt(b)) && isNaN(parseInt(c))) {
			return message.reply('You are missing an argument!! Use this command like : `a.gift (number) (item) (@)`')
		}



		if (!isNaN(parseInt(a))) {
			var number = a
			var numbercode = 'a'
		} else if (!isNaN(parseInt(b))) {
			var number = b
			var numbercode = 'b'
		} else if (!isNaN(parseInt(c))) {
			var number = c
			var numbercode = 'c'
		}

		if (a[0] === '<') {
			if (numbercode === 'c') {
				var item = b
			} else {
				var item = c
			}

		} else if (b[0] === '<') {
			if (numbercode === 'c') {
				var item = a
			} else {
				var item = c
			}

		} else if (c[0] === '<') {
			if (numbercode === 'a') {
				var item = b
			} else {
				var item = a
			}

		} else {
			return message.reply('You are missing an argument!! Use this command like : `a.gift (number) (item) (@)`')

		}

		if (item === 'rarefish') {
			item = 'rare'
		}

		if (item === 'commonfish') {
			item = 'common'
		}
		if (item === 'fish') {
			item = 'common'
		}


		console.log('item: ' + item + '\namount : ' + number)


		var result = await db.fetchitem(giver.id, item)
		console.log(result)
		var itema = result
		console.log(result)
		if (parseInt(number) < 0) {
			return message.reply('you cant do this')
		}

		if (isNaN(parseInt(itema))) {
			return message.reply('you dont have any of this item, or it doesnt exist!')
		} else if (parseInt(itema) < parseInt(number)) {
			return message.reply(`you dont have enough ${item}s!`)
		} else {
			result = await db.fetch(reciever.id)
			var recieverinv = result[item]
			var giverinv = await db.fetchitem(giver.id, item)


			console.log(`${reciever.id} inv + number: ${number}`)
			var newrecieverinv = parseInt(recieverinv) + parseInt(number)
			var newgiverinv = parseInt(giverinv) - parseInt(number)
			console.log(newrecieverinv)

			if (item === 'ball' && newrecieverinv > 50) {
				return message.reply('they already maxed out this item!')
			}

			db.set(reciever.id, item, newrecieverinv);

			db.set(giver.id, item, newgiverinv);

			return re('Package shipped!', 'You gave `' + number + ' ' + item + '` to ' + reciever.username + `\nNow you have : ${newgiverinv} and they have : ${newrecieverinv}`)


		}




	},
};

