const Discord = require('discord.js');


module.exports = {
	name: 'type',
	description: 'Start a multiplayer typing race',
	usage: '`a.type`',
	category: 'fun',
	cooldown: 60,

	async execute(message, args) {
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

		var strings = [
			""
		]
		var encodedText = ''

		var text = strings[Math.floor(Math.random() * strings.length)]
		text.split``.forEach(a => encodedText += a + '󠀠')
		re('Type the following: ', encodedText)
		await message.channel.awaitMessages(m => m.content.toLowerCase() === text.toLowerCase(),
			{ max: 1, time: 60000 }).then(async collected => {
				return message.channel.send(`<@${collected.first().author.id}> won the typing race!`)
			}).catch(() => {
				message.reply('No one won the typing race :(')
			})

	},
};














