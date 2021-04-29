const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')


module.exports = {
	name: 'drop',
	description: 'Drop coins into the chat!',
	usage: '`a.drop <amount>`',
	category: 'economy',
	cooldown: 15,

	async execute(message, args) {

		var host = message.author.id
		var amount;
		var grabbers = [];

		var result = await db.fetch(message.author.id)




		if (parseInt(args[0])) {
			amount = args[0]
		} else {
			return embeds.errorEmbed(message, '**Invalid input.**')
		}

		if (amount < 5000) {
			return embeds.errorEmbed(message, '**Minimum drop** is **5,000**')
		}

		if (amount > kabob) {
			return embeds.errorEmbed(message, 'You **don\'t have this much** money bro.')
		}
		var newnine = result.bal - amount
		await db.set(message.author.id, 'bal', newnine)
		message.channel.send(`${message.author} dropped ${amount} coins in the chat\nSay ` + '`GRAB` to take some! (you have 15 seconds)')


		var messages = await message.channel.awaitMessages(() => true, { time: 15000 })
		var i;

		await messages.forEach((message) => {
			if (message.content.toLowerCase() == "grab" && !message.author.bot && message.author.id !== host && grabbers.includes(message.author) === false) {
				grabbers.push(message.author)
			}
		})
		if (grabbers.length === 0) {
			return message.reply('you dropped your money and it fell into the ocean <:Sad_Vibes:793084542763139073>')
		}

		console.log(grabbers)
		var balfetch;
		var bal;
		var newbal;
		var text = []
		var each = Math.floor(amount / grabbers.length)

		for (i = 0; i < grabbers.length; i++) {
			balfetch = await db.fetch(grabbers[i].id)
			bal = balfetch.bal
			newbal = bal + each
			await db.set(grabbers[i].id, 'bal', newbal)
			text.push(grabbers[i].username + ' grabbed ' + each + ' coins.\n')
		}


		var string = "";
		var i;
		console.log(text.length)
		if (text.length > 30) {



			var string = "";
			var i;
			for (i = 0; i < text.length; i++) {
				if ((i) % 30 === 0 && i !== 0) {
					message.channel.send('```css\n' + string + '```')
					string = ""
				};

				string = string + text[i]
			}
			if ((i) % 30 !== 0) {
				message.channel.send('```css\n' + string + '```')

			}


		} else {
			message.channel.send('```css\n' + text.join('') + '```')

		}




	},
}