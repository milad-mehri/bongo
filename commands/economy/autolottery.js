

const db = require('../../db.js');

		const Discord = require('discord.js');


const userSchema = require('../../schemas/user-schema')



module.exports = {
		name: 'autolottery',
	description: 'Sign up to be automatically entered in the hourly lottery!',
	usage: '`a.autolottery`',
  category: 'economy',
	

	async execute(message) {

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







var result = await db.fetch(message.author.id)
		let autolottery = result.autolottery

		if (autolottery) {
			
			message.channel.send('Turned autolottery off');

	await userSchema.findOneAndUpdate({ "userid": message.author.id }, {autolottery : false	})

		} else {

	await userSchema.findOneAndUpdate({ "userid": message.author.id }, {autolottery : true	})
			re('Turned autolottery on', 'If you want to enter the current lottery you still have to do a.lottery\nYou will get DM\'d if you win the lottery');

		}








	},
};














