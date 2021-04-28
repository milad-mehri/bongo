const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'drop',
	description: 'Drop coins into the chat!',
	usage: '`a.drop <amount>`',
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
		var host = message.author.id
		var amount;
		var grabbers = [];
		/*	if(message.gulid.id !== '763669299889831936'){
				return
		}*/
		var result = await db.fetch(message.author.id)

		var kabob = result.bal


		let cooldown = 15000;


		let lastdrop = parseInt(result.dropcooldown + '000')

		if (lastdrop !== null && cooldown - (Date.now() - lastdrop) > 0) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lastdrop);
			return re(
				'Woah slow down',
				`You have to wait` + '`' + timeObj / 1000 + '`s before dropping coins again'
			);
		} else {
			var time = Date.now().toString().slice(0, -3)
			var result = await db.set(message.author.id, 'dropcooldown', time)
		}



		if (parseInt(args[0])) {
			amount = args[0]
		} else {
			return message.reply('invalid input.')
		}

		if (amount < 5000) {
			return message.reply('minimum drop is 5000')
		}

		if (amount > kabob) {
			return message.reply('you dont have this much money bro')
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