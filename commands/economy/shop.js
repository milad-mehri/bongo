
const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')


module.exports = {
	name: 'shop',
	description: 'View the shop or the details of an item',
	aliases: ['store'],
	usage: '`a.shop <item>`, `a.shop`',
	category: 'economy',

	async execute(message, args) {

		var over = false
		const result = await db.fetch(message.author.id)

		


	},
};
















