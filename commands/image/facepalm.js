const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'facepalm',
	usage: '`a.facepalm (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.facepalm(avatar);
		let attachment = new Discord.MessageAttachment(image, "facepalmed.png");
		return message.channel.send(attachment);
	},
};














