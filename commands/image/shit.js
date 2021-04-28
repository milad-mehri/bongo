const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'shit',
	usage: '`a.shit (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.shit(avatar);
		let attachment = new Discord.MessageAttachment(image, "shited.png");
		return message.channel.send(attachment);
	},
};














