const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'beautiful',
	usage: '`a.beautiful (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.beautiful(avatar);
		let attachment = new Discord.MessageAttachment(image, "beautifuled.png");
		return message.channel.send(attachment);
	},
};














