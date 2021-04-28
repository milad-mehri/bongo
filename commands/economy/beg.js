


const db = require('../../db.js');

const Discord = require('discord.js');



module.exports = {
	name: 'beg',
	description: 'Beg randoms for money',
	usage: '`a.beg`',
  category: 'economy',

	async execute(message, premiumusers) {

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
		var result = await db.fetch(message.author.id)

		let cooldown = 10000; // 12 hours in ms

		let lastBeg = parseInt(result.begcd + '000')

		if (lastBeg !== null && cooldown - (Date.now() - lastBeg) > 0) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lastBeg);
			return re(
				'Woah slow down',
				`You have to wait` + '`' + timeObj / 1000 + '`s before begging.'
			);
		}
		// Otherwise they'll get their daily


		var random = Math.floor(Math.random() * 13 + 1);

		if (random === 1) {
			console.log(result)
			var newbal = parseInt(result.bal) + 1000;
			console.log(newbal)
			db.set(message.author.id, 'bal', newbal)
			message.reply(" milad blessed you with $1000 don't waste it ");
		} else if (random === 2) {

			var newbal = parseInt(result.bal) + 20;
			db.set(message.author.id, 'bal', newbal)
			message.reply(
				' bongo gave you  $200 coins after you danced for him :dancer: '
			);
		} else if (random === 3) {

			var newbal = parseInt(result.bal) + 250;
			db.set(message.author.id, 'bal', newbal)
			message.reply(
				' the local cop gave you  $250 coins after you danced for him :dancer: '
			);
		} else if (random === 4) {

			var newbal = parseInt(result.bal) + 10;
			db.set(message.author.id, 'bal', newbal)
			message.reply(' Donald Trump gave you ten coins :nauseated_face: ');
		} else if (random === 5) {


			var newbal = parseInt(result.bal) + 1;
			db.set(message.author.id, 'bal', newbal);
			message.reply(' a homeless man gave you one coin :coin: ');
		} else if (random === 6) {

			var newbal = parseInt(result.bal) + 500;
			db.set(message.author.id, 'bal', newbal)
			message.reply('you endorsed bongo in a Discord server and earned $500');
		} else if (random === 7) {

			var newbal = parseInt(result.bal) + 50;
			db.set(message.author.id, 'bal', newbal)
			message.reply('the restaurant waiter let you take extra mints, and you sold them for $50');
		} else if (random === 8) {

			var newbal = parseInt(result.bal) + 5000;
			db.set(message.author.id, 'bal', newbal)
			message.reply('you sold a forged painting for $5000');
		} else if (random === 9) {

			var newbal = parseInt(result.bal) + 100;
			db.set(message.author.id, 'bal', newbal)
			message.reply('you convinced someone to buy a "magic rock" from you for $100');
		} else if (random === 10) {

			var newbal = parseInt(result.bal) + 5000;
			db.set(message.author.id, 'bal', newbal)
			message.reply('you secretly popped someones tire, then offered to fix it for them for $5000');
		} else if (random === 11) {

			var newbal = parseInt(result.bal) + 5000;
			db.set(message.author.id, 'bal', newbal)
			message.reply('your bet on Floyd Mayweather VS Logan Paul won you $5000');
		} else if (random === 12) {

			var newbal = parseInt(result.bal) + 2;
			db.set(message.author.id, 'bal', newbal)
			message.reply('you did a silly magic trick for some gullible kids and earned $2');
		} else if (random === 13) {

			var newbal = parseInt(result.bal) + 510;
			db.set(message.author.id, 'bal', newbal)
			message.reply('you won an anti-beauty contest with a $500 prize and a fake medal you sold for $10');
		}
		var time = Date.now().toString().slice(0, -3)
		await db.set(message.author.id, 'begcd', time)



	},
};
