


const Discord = require('discord.js');
const embeds = require('../../functions/embeds')

module.exports = {
	name: 'membercount',
	description: 'Get the servers member count.',
	usage: '`a.membercount`',
	category: 'utility',
	aliases: ['mc', 'member', 'members', 'membercounts'],

	async execute(message, args) {
		await message.guild.members.fetch()

		var mc = message.client.guilds.cache.get(message.guild.id).memberCount;
		embeds.defaultEmbed(message,'Server Member count', `All members: ${mc}
		Members: ${message.guild.members.cache.filter(member => !member.user.bot).size}
		Bots: ${message.guild.members.cache.filter(member => member.user.bot).size}`);


	},
};