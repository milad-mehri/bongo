const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const emojis = require('../../design/emojis.json')
module.exports = {
	name: 'fish',
	description: 'Use your fishing rod to find fish!',
	usage: '`a.fish`',
	category: 'economy',
	cooldown: 10,
	async execute(message) {

		var result = await db.fetch(message.author.id)




		if (result.rod < 1) return embeds.errorEmbed(message, 'You **don\'t have a rod **:rolling_eyes:')
		var random = Math.floor(Math.random() * 10) + 1
		var common = Math.floor(Math.random() * 3) + 1


		message.channel.send(emojis.fishing + ' fishing...').then(msg => {
			setTimeout(async function () {

				if ([1].includes(random)) {
					await db.set(message.author.id, 'rod', result.rod - 1)
					return msg.edit(':fishing_pole_and_fish: You went fishing and **hit a rock**\nNow you lost your rod :sob: ')
				} else if ([2, 3, 4].includes(random)) {
					return msg.edit(':fishing_pole_and_fish: You went fishing and came back with nothing')
				} else if ([5, 6, 7,].includes(random)) {
					db.set(message.author.id, 'common', result.common + common)
					return msg.edit(':fishing_pole_and_fish: You went fishing and came back with **' + common + ' common fish **:fish: ')
				} else {

					db.set(message.author.id, 'rare', result.rare + 1)
					return msg.edit(':fishing_pole_and_fish: You went fishing and came back with **' + 1 + ' rare fish **:tropical_fish:  ')

				}
			}, 2000);
		})

	}
}