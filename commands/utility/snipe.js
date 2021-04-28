const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'snipe',
	description: 'Get the last deleted message of a channel',
	usage: '`a.snipe`',
	category: 'utility',
	async execute(message, args) {
		var result = await db.fetchguild(message.guild.id)
		if (!result.snipe) {
			return message.react('<:lock:835315561650847764>')
		}
		const msg = message.client.snipes.get(message.channel.id)
		if (!msg) return message.channel.send('there is nothing to snipe.')

		const snipeEmbed = new Discord.MessageEmbed()
			.setAuthor(msg.author.tag, msg.author.avatarURL())
			.setDescription(msg.content)
			.setColor('#0000000')
			.setImage(msg.image)
			.setFooter(message.guild.name, message.guild.iconURL())
			.setTimestamp();

		message.reply(snipeEmbed);

	}
}