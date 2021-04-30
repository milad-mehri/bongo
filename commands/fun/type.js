const Discord = require('discord.js');
const embeds = require('../../functions/embeds')

module.exports = {
	name: 'type',
	description: 'Start a multiplayer typing race',
	usage: '`a.type`',
	category: 'fun',
	cooldown: 60,

	async execute(message, args) {

		var strings = [
			`${message.author.username} is the slowest typer to ever exist!`,
			`${message.author.username} is the greatest person of all time.`,
			`I'm a barbie girl, in a barbie world!`,
			`I am the fatest typer and I will beat you in this typing race.`,
			`I did not copy and paste this because it's impossible to copy and paste in this game.`,
			`If I die, I'm a legend if I die, if I die, if I die.`,
			`Pop Smoke once said, "I'm not moving, I'm rolling"`
		]
		var encodedText = ''

		var text = strings[Math.floor(Math.random() * strings.length)]
		text.split``.forEach(a => encodedText += a + '󠀠')
		embeds.defaultEmbed(message, 'Type the following: ', encodedText)
		await message.channel.awaitMessages(m => m.content.toLowerCase() === text.toLowerCase(),
			{ max: 1, time: 60000 }).then(async collected => {
				return message.channel.send(`<@${collected.first().author.id}> won the typing race!`)
			}).catch(() => {
				message.reply('No one won the typing race :(')
			})

	},
};














