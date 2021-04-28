const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Kick a member',
	usage: '`a.kick @user`',
  category: 'moderation',

	execute(message, args) {



		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.reply('You cannot use the **kick** command.');
		}

		if (!message.mentions.users.size) {
			return message.reply('You need to **mention** someone.');
		}

		let member = message.mentions.members.first();
		member
			.kick()
			.then(member => {
				message.channel.send(`:wave: ${member.displayName} has been kicked`);
			})
			.catch(() => {
				if (!message.member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) {
					message.reply('You cannot kick members');
				} else if (
					member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])
				) {
					message.reply('You cannont kick this member');
				}
			});







	},
};
