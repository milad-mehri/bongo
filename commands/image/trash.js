const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'trash',
	usage: '`a.trash (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.trash(avatar);
		let attachment = new Discord.MessageAttachment(image, "trashed.png");
		return message.channel.send(attachment);
	},
};














