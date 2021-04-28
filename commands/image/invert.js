const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'invert',
	usage: '`a.invert (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.invert(avatar);
		let attachment = new Discord.MessageAttachment(image, "inverted.png");
		return message.channel.send(attachment);
	},
};














