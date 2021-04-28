const Discord = require('discord.js');


module.exports = {
	name: 'donate',
	description: 'Donate to help the bot',
	usage: '`a.donate`',

	execute(message) {

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


		message.channel.send('You can support developers and unlock premium features using patreon.\nYou must be in the bongo server to unlock premium. (`a.invite`) \n\nhttps://www.patreon.com/discordbongo\nIf you donated and didnt get the donor role.\nPremium users update every 5 minutes')






	},
};














