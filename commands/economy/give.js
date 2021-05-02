


const db = require('../../db.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')

const Discord = require('discord.js');





module.exports = {
	name: 'give',
	description: 'Give money to a user!',
	aliases: ['pay', 'send'],
	usage: '`a.give <amount> @user`',
	category: 'economy',

	async execute(message, args) {

		var amount;

		var giverResults = await db.fetch(message.author.id)

		if (!message.mentions.users.first()) return embeds.errorEmbed(message, 'You have to **mention** someone!')
		if (args[0][0] === '<') {
			amount = (args[1])
		} else {
			amount = (args[0])
		}

		if (["all", "max"].includes(amount.toLowerCase())) {
			amount = giverResults.bal
			if (amount < 1) return embeds.errorEmbed(message, "What money are you trying to give? lmao.")

		}


		if (!parseInt(amount)) return embeds.errorEmbed(message, 'You have to say **how much** you want to give.')


		var giver = message.author;
		var reciever = message.mentions.users.first();
		if (giver.id === reciever.id) return embeds.errorEmbed(message, 'You can\'t send money to your self!')
		var recieverResults = await db.fetch(reciever.id)

		if (giverResults.bal < amount) return embeds.errorEmbed(message, "You don't have enough money!")
		if (amount < 1) return embeds.errorEmbed(message, "What money are you trying to give? lmao.")

		await db.set(giver.id, "bal", giverResults.bal - amount)
		await db.set(reciever.id, "bal", recieverResults.bal + amount)

		message.reply(
			`You gave ${reciever.username} **$${functions.comma(amount)}**, now you have **$${functions.comma(giverResults.bal - amount)}** and they have **$${functions.comma(recieverResults.bal + amount)}**.`
		)


	},
};

