const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const emojis = require('../../design/emojis.json')
module.exports = {
	name: 'fish',
	description: 'Use your fishing rod to find fish!',
	usage: '`a.fish`',
  category: 'economy',
	async execute(message) {

		var result = await db.fetch(message.author.id)

		let cooldown = 5 * 1000;; // 12 hours in ms

		let lastfish = parseInt(result.fishcd + '000')

		if (lastfish !== null && cooldown - (Date.now() - lastfish) > 1) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lastfish);
			return embeds.cooldownEmbed(message, timeObj);
		} else {
			var time = Date.now().toString().slice(0, -3)
			await db.set(message.author.id, 'fishcd', time)
			

		}



		if (result.rod < 1) return embeds.errorEmbed(message, 'You **don\'t have a rod **:rolling_eyes:')
		var random = Math.floor(Math.random() * 90) + 1
		var common = Math.floor(Math.random() * 3) + 1
		if (random < 11) {
			await db.set(message.author.id, 'rod', result.rod - 1)
			message.channel.send(emojis.fishing + ' fishing...').then(msg => {
				setTimeout(function() {

					return msg.edit(':fishing_pole_and_fish: You went fishing and **hit a rock**\nNow you lost your rod :sob: ')

				}, 2000);
			})

		} else if (random > 10 && random < 41) {
			message.channel.send(emojis.fishing +  ' fishing...').then(msg => {
				setTimeout(function() {

					return msg.edit(':fishing_pole_and_fish: You went fishing and came back with nothing')
				}, 2000);
			})
		} else if (random > 40 && random < 80) {
			message.channel.send(emojis.fishing + ' fishing...').then(msg => {
				setTimeout(function() {

					db.set(message.author.id, 'common', result.common + common)
					return msg.edit(':fishing_pole_and_fish: You went fishing and came back with **' + common + ' common fish **:fish: ')
				}, 2000);
			})
		} else {
			message.channel.send(emojis.fishing + ' fishing...').then(msg => {
				setTimeout(function() {

					db.set(message.author.id, 'rare', result.rare + 1)
					return msg.edit(':fishing_pole_and_fish: You went fishing and came back with **' + 1 + ' rare fish **:tropical_fish:  ')

				}, 2000);
			})

		}





	},
};

