const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'rip',
	usage: '`a.rip (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.rip(avatar);
		let attachment = new Discord.MessageAttachment(image, "riped.png");
		return message.channel.send(attachment);
	},
};














