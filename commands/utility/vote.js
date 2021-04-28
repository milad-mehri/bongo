

const Discord = require('discord.js');





module.exports = {
	name: 'vote',
	description: 'Vote for the bot!',
	usage: '`a.vote`',
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


		re(':gift: Voting on top.gg :gift:', ':tada: Vote for Bongo Bot :tada: : [here](https://top.gg/bot/780943575394942987/vote)\nReward 1 Common box, 2 Common boxes on Friday, Saturday and Sunday\n\n:tada: Vote for Bongo Support Server :tada: : [here]( https://top.gg/servers/781393539451977769/vote)\nReward : 1 Common Box + Temperary Voter role(exclusive giveaways)')






	},
};














