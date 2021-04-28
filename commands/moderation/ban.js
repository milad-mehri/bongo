const Discord = require('discord.js');





module.exports = {
	name: 'ban',
	description: 'Ban a member',
	usage: '`a.ban @member`',
	category: 'moderation',

	execute(message) {
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return message.reply('You cannot use the **ban** command.');
		}

		if (!message.mentions.users.size) {
			return message.reply('You need to **mention** someone.');
		}
		if (message.mentions.members.first().hasPermission('BAN_MEMBERS')) return message.channel.send('I can\'t ban this member')
		let member = message.mentions.members.first();

		if (!message.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
			return message.reply('You cannot ban members.');
		} else if (
			member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])
		) {
			return message.reply('You cannont ban this member.');
		}
		member
			.ban()
			.then(member => {
				message.channel.send(`:wave: ${member.displayName} has been banned`);
			})
			.catch(() => {

			});




	},
};














