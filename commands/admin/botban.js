const Discord = require('discord.js');
const db = require('../../db.js');

module.exports = {
	name: 'botban',
	description: 'Admin only',

	async execute(message, args) {
		if(message.author.id !== '248692731163967498') return
		const embed = new Discord.MessageEmbed()
			// Set the title of the field
			.setTitle('Blacklisted')
			// Set the color of the embed
			.setColor('6FA8DC')
			.setDescription('You have been blacklisted for:\n`' + args.join(' ') + '`');

		// Send the embed to the same channel as the message
		message.channel.send(embed);
		if (message.author.id !== '248692731163967498') {
			return;
		}
		var result = await db.fetch(message.mentions.users.first().id)
		await db.set(message.mentions.users.first().id, 'banned', true)
		message.mentions.users.first().send(embed)



	},
};