


const db = require('../../db.js');
const embeds = require('../../functions/embeds')

const Discord = require('discord.js');


module.exports = {
	name: 'gift',
	description: 'Send an item to a user!',
	usage: '`a.gift <item> @user`',
  category: 'economy',

	async execute(message, args) {


		var giver = message.author;
		var reciever = message.mentions.users.first();

		if (giver === reciever) {
			return embeds.errorEmbed(message,'You cant gift items to yourself..')
		}

		var a = args[0]
		var b = args[1]
		var c = args[2]

		if (undefined === c || b === undefined || a === undefined) {
			return embeds.errorEmbed(message, 'You are missing an argument!! Use this command like : ```a.gift (number) (item) (@)```')
		}


		if (isNaN(parseInt(a)) && isNaN(parseInt(b)) && isNaN(parseInt(c))) {
			return embeds.errorEmbed(message,'You are missing an argument!! Use this command like : `a.gift (number) (item) (@)`')
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
			return membeds.errorEmbed(message,'You are missing an argument!! Use this command like : ```a.gift (number) (item) (@)```')

		}






		var result = (await db.fetch(giver.id))[item]
		var itema = result
		if (parseInt(number) < 0) {
			return embeds.errorEmbed(message,'You **can\'t do this**')
		}

		if (isNaN(parseInt(itema))) {
			return embeds.errorEmbed(message,'You **don\'t have any of this item**, or it **doesnt exist!**')
		} else if (parseInt(itema) < parseInt(number)) {
			return embeds.errorEmbed(message,`You **don\'t have enough** ${item}s!`)
		} else {
			result = await db.fetch(reciever.id)
			var recieverinv = result[item]
			var giverinv = (await db.fetch(giver.id))[item]


			var newrecieverinv = parseInt(recieverinv) + parseInt(number)
			var newgiverinv = parseInt(giverinv) - parseInt(number)

			if (item === 'ball' && newrecieverinv > 50) {
				return embeds.errorEmbed(message,'They already** maxed out** this item!')
			}

			db.set(reciever.id, item, newrecieverinv);

			db.set(giver.id, item, newgiverinv);

			return embeds.defaultEmbed(message,'Package shipped!', 'You gave `' + number + ' ' + item + '` to ' + reciever.username + `\nNow you have : ${newgiverinv} and they have : ${newrecieverinv}`)


		}




	},
};

