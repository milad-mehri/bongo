const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'sepia',
	usage: '`a.sepia (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.sepia(avatar);
		let attachment = new Discord.MessageAttachment(image, "sepiaed.png");
		return message.channel.send(attachment);
	},
};














