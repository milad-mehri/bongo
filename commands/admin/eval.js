const { inspect } = require('util');
const db = require('../../db.js');

const Discord = require('discord.js');


module.exports = {
	name: 'eval',
	description: 'Admin only',

	async execute(message, args, client) {
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


		if (message.author.id !== '248692731163967498' ) {
	
			return;
		}



		let evaled;
		try {
			evaled = await eval(args.join(' '));
			// message.channel.send(inspect(evaled));
			console.log(inspect(evaled));
		}
		catch (error) {
			console.error(error);
			message.reply('there was an error during evaluation.');
		}









	},
}