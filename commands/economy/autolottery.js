const db = require('../../db.js'); //Database functions
const Discord = require('discord.js');
const embeds = require('../../functions/embeds') //Embed function

module.exports = {
	name: 'autolottery',
	description: 'Sign up to be automatically entered in the lottery!',
	usage: '`a.autolottery`',
	category: 'economy',

	async execute(message) {

		//Check if user has autolottery on or off
		var result = await db.fetch(message.author.id)


		if (result.lottery.autolottery) {
			//Turn autolottery off if it was on
			embeds.successEmbed(message, 'Turned autolottery **off**');
			result.lottery.autolottery = false


		} else {

			//Turn autolottery on if it was off

			result.lottery.autolottery = true

			embeds.successEmbed(message, 'Turned autolottery **on**');

		}


		await db.set(message.author.id, 'lottery', result.lottery)

	},
};