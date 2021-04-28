const Discord = require('discord.js');
const canvacord = require("canvacord")



module.exports = {
	name: 'jokeoverhead',
	usage: '`a.jokeoverhead (mention)`',
	category: 'image',
	aliases:['youmissedthejoke', 'ymtj', 'joh'],

	async execute(message) {
		var member = message.mentions.users.first() || message.author
		let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
		let image = await canvacord.Canvas.jokeOverHead(avatar);
		let attachment = new Discord.MessageAttachment(image, "jokeoverhead.png");
		return message.channel.send(attachment);
	},
};














