
const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require("../../functions/embeds")
const functions = require("../../functions/functions")
module.exports = {
	name: 'rob',
	description: 'Rob another user!',
	usage: '`a.rob @user`',
	aliases: ['steal'],
	category: 'economy',
	cooldown: 0,

	async execute(message, args) {
		/*
		
		@Future anti-rob item
		
		personRobbingObject.rob.banTime = 10*60000
		personRobbingObject.rob.banStart = Date.now()

		return await db.set(personRobbingObject.id, "rob", personRobbingObject.rob)
		*/

		if (!message.mentions.users.first()) return embeds.errorEmbed(message, 'You have to **mention** someone.');

		var personRobbing = message.author;
		var personGettingRobbed = message.mentions.users.first();


		var personRobbingObject = await db.fetch(message.author.id);
		var personGettingRobbedObject = await db.fetch(message.mentions.users.first().id);

		if (personRobbingObject.bal < 1000) return embeds.errorEmbed(message, "You need at least **$1000** to rob someone.")
		if (personGettingRobbedObject.bal < 1000) return message.channel.send(`${personGettingRobbed.username} is too broke, it's not worth robbing them.`)

		if ((personGettingRobbedObject.rob.invincibleStart + personGettingRobbedObject.rob.invinciblityTime) > Date.now()) {
			var time = functions.msToString((personGettingRobbedObject.rob.invincibleStart + personGettingRobbedObject.rob.invinciblityTime - Date.now()))
			return message.channel.send(`You can't rob **${personGettingRobbed.username}** for another **${time}**.`)
		}

		if ((personRobbingObject.rob.banStart + personRobbingObject.rob.banTime) > Date.now()) {
			var time = functions.msToString((personRobbingObject.rob.banStart + personRobbingObject.rob.banTime - Date.now()))
			return message.channel.send(`You can't rob anyone for another **${time}**.`)
		}

		await db.set(personGettingRobbed.id, "rob", personGettingRobbedObject.rob)
		var random = Math.floor(Math.random() * 100)
		var amount; 
		if (random < 1) {
			amount = Math.floor(personGettingRobbedObject.bal / 2)
			personGettingRobbedObject.rob.invinciblityTime = 60000 * 5
		} else if (random < 5) {
			amount = Math.floor(personGettingRobbedObject.bal * 0.4)
			personGettingRobbedObject.rob.invinciblityTime = 60000 * 4
		} else if (random < 15) {
			amount = Math.floor(personGettingRobbedObject.bal * 0.25)
			personGettingRobbedObject.rob.invinciblityTime = 60000 * 2.5
		} else if (random < 50) {
			amount = Math.floor(personGettingRobbedObject.bal * 0.15)
			personGettingRobbedObject.rob.invinciblityTime = 60000 * 1.5
		} else {
			amount = Math.floor(personGettingRobbedObject.bal * 0.10)
			personGettingRobbedObject.rob.invinciblityTime = 60000 * 1
		}


		amount = Math.floor(Math.random() * amount) + 1

		await db.set(personRobbing.id, "bal", personRobbingObject.bal + amount)
		await db.set(personGettingRobbed.id, "bal", personGettingRobbedObject.bal - amount)

		personGettingRobbedObject.rob.invincibleStart = Date.now()

		await db.set(personGettingRobbed.id, "rob", personGettingRobbedObject.rob)

		personGettingRobbed.send(`${message.author.tag} robbed **$${functions.comma(amount)}** from you in ${message.guild.name}.`)
		return message.channel.send("You robbed **$" + functions.comma(amount) + "** from " + personGettingRobbed.username + ".")




	},
};
