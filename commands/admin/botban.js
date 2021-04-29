const Discord = require('discord.js');
const db = require('../../db.js');
const colors = require('../../design/colors.json');
const {botAdmins} = require('../../config/config.json')
const embeds = require('../../functions/embeds')

module.exports = {
	name: 'botban',
	description: 'Admin only',

	async execute(message, args) {
		if(!botAdmins.includes(message.author.id)) return
		const embed = new Discord.MessageEmbed()
			.setTitle('Blacklisted')
			.setColor(colors.red)
			.setDescription('You have been blacklisted for ' + args.slice(1).join(' ') );

		if(!message.mentions.users.first()) return embeds.errorEmbed(message , 'You need to mention someone.')
		if(!args[2]) return embeds.errorEmbed(message, 'You need to provide a reason.')

		message.channel.send(embed);
		var result = await db.fetch(message.mentions.users.first().id)
		await db.set(message.mentions.users.first().id, 'banned', true)
		message.mentions.users.first().send(embed)



	},
};