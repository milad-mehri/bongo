const Discord = require('discord.js');

module.exports = {
	name: 'botstats',
	description: 'Admin only',

	execute(message, args) {

		if (message.author.id !== '248692731163967498') {
			return;
		}
		const promises = [
			message.client.shard.fetchClientValues('guilds.cache.size'),
			message.client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
		];

		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);

				return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
			})
			.catch(console.error);
	},
};