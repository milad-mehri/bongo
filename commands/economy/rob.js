
const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'rob',
	description: 'Rob another user!',
	usage: '`a.rob @user`',
	aliases: ['steal'],
	category: 'economy',
	cooldown: 10,

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


		// Otherwise they'll get their daily
		if (isNaN(message.mentions.users.first())) {
			return message.reply(':angry: mention who you want to rob.');
		}

		var rober = message.author;
		var robee = message.mentions.users.first();


		if (robee.id === '780943575394942987') {
			return message.reply("stay away from me or I'll take all your money!")
		}

		var resulta = await db.fetch(robee.id)
		if (resulta.banned) return message.reply('smh, robbed banned users')
		var bal = resulta.bal
		var bal2 = result.bal

		if (parseInt(bal2) < parseInt('1000')) {
			return message.reply(' you need at least 1000 coins to rob someone!');
		}



		if (rober === robee) {
			return message.channel.send('You cant rob yourself :angry: ');
		}
		if (robee === undefined) {
			return message.reply(':angry: mention who you want to rob.');
		}



		if (parseInt(bal) < 1000) {
			return message.reply("its not worth it, they're broke");
		} else {



			var r = Math.floor(Math.random() * 4 + 1);
			if (true) {
				let shields = resulta.shield




				if (parseInt('0') < parseInt(shields) || parseInt('1') === parseInt(shields)) {

					var bypass = Math.floor(Math.random() * 6 + 1);

					if (bypass !== 3) {

						var news = parseInt(shields) - parseInt('1')
						db.set(robee.id, 'shield', news);


						bal2 = result.bal

						bal = result.bal


						newbal = parseInt(bal) - 1000;
						db.set(rober.id, 'bal', newbal);


						newbal = resulta.bal
						newnewbal = parseInt(newbal) + 1000;
						db.set(robee.id, 'bal', newnewbal);

						robee.send(`**${rober.username}** tried to rob you **but** your shield saved you :shield:! They also had to pay a fine of 1000`)
						return re('Nice try', `You tried robbing ${robee.username} but their shield saved them! AND you paid a $1000 fine`)
						return;
					}
				}

				var randomc = Math.floor(Math.random() * 4 + 1);
				if (bypass === 3 || randomc !== 3) {
					var random = Math.floor(Math.random() * 10 + 1);
					var amount = Math.round((random / 100) * parseInt(bal));

					if (amount > 100000) {
						amount = 100000
					}

					var newbal = parseInt(bal) - amount;
					db.set(robee.id, 'bal', newbal);
					result = await db.fetch(message.author.id)
					newbal = result.bal
					var newnewbal = parseInt(newbal) + parseInt(amount);
					db.set(message.author.id, 'bal', newnewbal);
					robee.send(`**${rober.username}** robbed **${amount}** from you!`)


					re(
						'You robbed ' + robee.username,
						`You robbed **${amount}** from **${robee.username}**`
					);
				} else {

					robee.send(`**${rober.username}** tried robbing but they escaped without getting fined`)
					re(
						'You got caught by ' + robee.username,
						`but you escaped without getting fined`
					);



				}
			}
		}



	},
};
