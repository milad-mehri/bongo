const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'disable',
	description: 'Disable/enable rob',
	usage: '`a.disable rob`',
	aliases: ['enable'],
	category: 'utility',
  

	async execute(message, args) {



		let permission = message.member.hasPermission('ADMINISTRATOR');

		if (!permission)
			return message.channel.send(
				'You are missing the permission `ADMINISTRATOR`'
			);

		if (!args[0]) return message.reply('you must do a.disable (command)(only rob for now)(lol)')

		if (args[0] === 'rob' || args[0] === 'steal') {
			var result = await db.fetchguild(message.guild.id)

			let rob = result.rob

			if (rob) {
				db.guildset(message.guild.id, 'rob', false);
				message.channel.send('Turned rob off');

				console.log('rob' + rob);
			} else {
				db.guildset(message.guild.id, 'rob', true);

				message.channel.send('Turned rob on');

				console.log('rob' + rob);
			}

		}else if (args[0] === 'snipe' ) {
			var result = await db.fetchguild(message.guild.id)

			let snipe = result.snipe

			if (snipe) {
				db.guildset(message.guild.id, 'snipe', false);
				message.channel.send('Turned snipe off');

				console.log('snipe' + snipe);
			} else {
				db.guildset(message.guild.id, 'snipe', true);

				message.channel.send('Turned snipe on');

				console.log('snipe' + snipe);
			}

		}


	},
};

