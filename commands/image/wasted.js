const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'wasted',
	usage: '`a.wasted (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.wasted(avatar);
		let attachment = new Discord.MessageAttachment(image, "wasteded.png");
		return message.channel.send(attachment);
	},
};














