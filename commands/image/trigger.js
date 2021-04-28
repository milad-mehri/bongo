const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'trigger',
	aliases: ['triggered'],
	usage: '`a.trigger (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.trigger(avatar);
		let attachment = new Discord.MessageAttachment(image, "triggered.gif");
		return message.channel.send(attachment);
	},
};














