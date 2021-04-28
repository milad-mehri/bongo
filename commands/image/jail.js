const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'jail',
	usage: '`a.jail (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.jail(avatar);
		let attachment = new Discord.MessageAttachment(image, "jailed.png");
		return message.channel.send(attachment);
	},
};














