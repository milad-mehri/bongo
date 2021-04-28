const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'blur',
	usage: '`a.blur (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.blur(avatar);
		let attachment = new Discord.MessageAttachment(image, "blured.png");
		return message.channel.send(attachment);
	},
};














