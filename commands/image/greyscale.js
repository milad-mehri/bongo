const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'greyscale',
	usage: '`a.greyscale (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.greyscale(avatar);
		let attachment = new Discord.MessageAttachment(image, "greyscaleed.png");
		return message.channel.send(attachment);
	},
};














