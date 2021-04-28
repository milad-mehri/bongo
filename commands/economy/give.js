


const db = require('../../db.js');

const Discord = require('discord.js');





module.exports = {
	name: 'give',
	description: 'Give money to a user!',
	aliases: ['pay', 'send'],
	usage: '`a.give <amount> @user`',
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







		function comma(number) {
			var i = number.toString();
			i = i.split("").reverse();
			i.forEach((item, index) => {
				if (index % 3 == 0) i[index] = i[index] + ",";
			});
			i[0] = i[0][0];
			return i.reverse().join("");
		}












		var giver = message.author;
		var reciever = message.mentions.users.first();
		if (giver === reciever) {
			return message.channel.send('You cant send money to your self :angry: ');
		}
		var a = args[1]
		var b = args[0]

		var result = await db.fetch(giver.id)

		var giverbal = result.bal
		if (giverbal < 1) return message.channel.send('what money are you giving away lmao')


		if (reciever === undefined) {
			return message.reply(':angry: mention who you want to give money to.');
		}


		var result = await db.fetch(message.author.id)

		var bal = result.bal


		if (a === 'max' || a === 'all') {
			a = bal
		}
		if (b === 'max' || b === 'all') {
			b = bal
		}


		if (a === 'half') {
			a = parseInt(bal) / 2
		}
		if (b === 'half') {
			b = parseInt(bal) / 2
		}




		a = parseInt(a)

		b = parseInt(b)



		console.log(a + '\n' + b)

		if (isNaN(parseInt(a))) {
			if (isNaN(parseInt(b))) {
				message.reply(':angry: Invalid input.. ');
			} else {

				if (parseInt(giverbal) >= parseInt(b)) {
					var bal = result.bal
					if (parseInt(b) < 0) {
						return message.reply('you cant do this')
					}


					var result = await db.set(giver.id, 'bal', parseInt(bal) - parseInt(b))

					result = await db.fetch(reciever.id)
					var bal = result.bal

					await db.set(reciever.id, 'bal', parseInt(bal) + parseInt(b))

					message.reply(
						`You gave ${reciever} ${b} coins. Now they have ${bal + parseInt(b)}`
					);
				} else {
					message.reply('You dont have enough money!');
					console.log('bitch \n ' + giverbal + '\n' + b)

				}
			}
		} else {
			if (parseInt(a) < 0) {
				return message.reply('you cant do this')
			}
			var result = await db.fetch(giver.id)
			var giverbal = result.bal
			if (giverbal >= a) {
				var bal = result.bal

				await db.set(giver.id, 'bal', parseInt(bal) - parseInt(a))
				var result = await db.fetch(reciever.id)
				var bal = result.bal
				await db.set(reciever.id, 'bal', parseInt(bal) + parseInt(a))
				return message.reply(
					`You gave ${reciever.username} ${a} coins. Now they have ${bal + parseInt(a)}`
				);
			} else {
				message.reply('You dont have enough money!');
				console.log('bitch \n ' + giverbal + '\n' + a)
			}
		}











	},
};

