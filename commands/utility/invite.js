const Discord = require('discord.js');


module.exports = {
	name: 'invite',
	description: 'Get the invite link for the bot and the support server',
	usage: '`a.invite`',
	aliases:['support', 'server', 'add'],
	category: 'utility',

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

		re('Join our server ', `${message.author.username}, add the bot to your server with [this link](https://ptb.discord.com/api/oauth2/authorize?client_id=780943575394942987&permissions=1074129990&scope=bot)`);
		message.channel.send('https://discord.gg/yt6PMTZNQh');


	},
};
