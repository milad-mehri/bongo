const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')


module.exports = {
	name: 'inventory',
	description: 'View your inventory or the inventory of a mentioned user',
	aliases: ['inv'],
	usage: '`a.inv`, `a.inv @user`',
	category: 'economy',

	async execute(message, args) {

		var page;



		if (!message.mentions.users.size) {
			if (!parseInt(args[0])) {
				page = 0
			} else {
				page = parseInt(args[0]) - 1
			}
			var inventory = []
			var result = await db.fetch(message.author.id)
			message.client.items.forEach(item => {
				if (result[item.name] > 0) inventory.push(
					`${result[item.name]} - ${item.displayName} ${item.emoji}`
				)
			})

			var invPages = functions.chunkArray(inventory, 7)
			if (!invPages[page]) return embeds.errorEmbed(message, 'This page doesn\'t exist...')
			return embeds.defaultEmbed(message, "Inventory", invPages[page].join('\n\n'), "blue", `Page ${page + 1} of ${invPages.length}`)

		} else {
			if (!parseInt(args[1])) {
				page = 0
			} else {
				page = parseInt(args[1]) - 1
			}

			var inventory = []
			var result = await db.fetch(message.mentions.members.first().id)
			message.client.items.forEach(item => {
				if (result[item.name] > 0) inventory.push(
					`${result[item.name]} - ${item.displayName} ${item.emoji}`
				)
			})

			var invPages = functions.chunkArray(inventory, 7)
			if (!invPages[page]) return embeds.errorEmbed(message, 'This page doesn\'t exist...')
			return embeds.defaultEmbed(message, "Inventory", invPages[page].join('\n\n'), "blue", `Page ${page + 1} of ${invPages.length}`)


		}

	},
};
