const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'rainbow',
	usage: '`a.rainbow (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.rainbow(avatar);
		let attachment = new Discord.MessageAttachment(image, "rainbowed.png");
		return message.channel.send(attachment);
	},
};














