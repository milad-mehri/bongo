const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'wanted',
	usage: '`a.wanted (mention)`',
	category: 'image',

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.wanted(avatar);
		let attachment = new Discord.MessageAttachment(image, "wanteded.png");
		return message.channel.send(attachment);
	},
};














