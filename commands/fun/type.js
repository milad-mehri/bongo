const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')

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
		]
		var encodedText = ''

		var startTime = Date.now()

		var text = strings[Math.floor(Math.random() * strings.length)]
		text.split``.forEach(a => encodedText += a + '󠀠')
		embeds.defaultEmbed(message, 'Type the following: ', encodedText)
		await message.channel.awaitMessages(m => m.content.toLowerCase() === text.toLowerCase(),
			{ max: 1, time: 60000 }).then(async collected => {
				var wpm = Math.floor((60 / ((Date.now() - startTime) / 1000)) * text.split(" ").length)

				
				return message.channel.send(`<@${collected.first().author.id}> won the typing race! (WPM: ${wpm})`)
			}).catch(() => {
				message.reply('No one won the typing race :(')
			})

	},
};














