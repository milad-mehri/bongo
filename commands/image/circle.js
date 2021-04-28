const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'circle',
	usage: '`a.circle (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.circle(avatar);
		let attachment = new Discord.MessageAttachment(image, "circleed.png");
		return message.channel.send(attachment);
	},
};














