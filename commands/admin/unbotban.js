const Discord = require('discord.js');
const db = require('../../db.js');
const colors = require('../../design/colors.json');
const {botAdmins} = require('../../config/config.json')
const embeds = require('../../functions/embeds')

module.exports = {
	name: 'unbotban',
	description: 'Admin only',

	async execute(message, args) {
		if(!botAdmins.includes(message.author.id)) return
		const embed = new Discord.MessageEmbed()
			.setTitle('Blacklisted')
			.setColor(colors.red)
			.setDescription('You have been unbanned!' );

		if(!message.mentions.users.first()) return embeds.errorEmbed(message , 'You need to mention someone.')

		message.channel.send(embed);
		var result = await db.fetch(message.mentions.users.first().id)
		await db.set(message.mentions.users.first().id, 'banned', false)
		message.mentions.users.first().send(embed)



	},
};