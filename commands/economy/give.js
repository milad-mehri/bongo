


const db = require('../../db.js');
const embeds = require('../../functions/embeds')

const Discord = require('discord.js');





module.exports = {
	name: 'give',
	description: 'Give money to a user!',
	aliases: ['pay', 'send'],
	usage: '`a.give <amount> @user`',
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


		var giver = message.author;
		var reciever = message.mentions.users.first();
		if (giver === reciever) {
			return embeds.errorEmbed(message, 'You **can\'t send money to yourself**!:angry: ');
		}
		var a = args[1]
		var b = args[0]

		var result = await db.fetch(giver.id)

		var giverbal = result.bal
		if (giverbal < 1) return embeds.errorEmbed(message, '**What money** are you giving away?** lmao**.')


		if (reciever === undefined) {
			return embeds.errorEmbed(message, ':angry: **mention** who you want to **give money** to.');
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




		if (isNaN(parseInt(a))) {
			if (isNaN(parseInt(b))) {
				embeds.errorEmbed(message, ':angry: **Invalid input**... ');
			} else {

				if (parseInt(giverbal) >= parseInt(b)) {
					var bal = result.bal
					if (parseInt(b) < 0) {
						return embeds.errorEmbed(message, 'You can\'t send negative money')
					}


					var result = await db.set(giver.id, 'bal', parseInt(bal) - parseInt(b))
					var sendbal = parseInt(bal) - parseInt(b)
					result = await db.fetch(reciever.id)
					var bal = result.bal

					await db.set(reciever.id, 'bal', parseInt(bal) + parseInt(b))

					message.channel.send(
						`You gave **${reciever.username} **${b}** coins. Now you have **$${sendbal}** and they have **$${bal + parseInt(b)}**.`
					);
				} else {
					embeds.errorEmbed(message, 'You dont have enough money!');
				}
			}
		} else {
			if (parseInt(a) < 0) {
				return embeds.errorEmbed(message, 'You **can\'t** send **negative money**!')
			}
			var result = await db.fetch(giver.id)
			var giverbal = result.bal
			if (giverbal >= a) {
				var bal = result.bal

				await db.set(giver.id, 'bal', parseInt(bal) - parseInt(a))
				var sendbal = parseInt(bal) - parseInt(a)
				var result = await db.fetch(reciever.id)
				var bal = result.bal
				await db.set(reciever.id, 'bal', parseInt(bal) + parseInt(a))
				return message.channel.send(
					`You gave **${reciever.username} **${b}** coins. Now you have **$${sendbal}** and they have **$${bal + parseInt(b)}**.`
				);
			} else {
				embeds.errorEmbed(message,'You dont have enough money!');
			}
		}











	},
};

