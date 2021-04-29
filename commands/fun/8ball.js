const Discord = require('discord.js');





module.exports = {
	name: '8ball',
	description: 'Get the answer to your question!',
	aliases: ['eightball', '8'],
	usage: '`a.8ball <question>`',
  category: 'fun',

	execute(message, args) {

		if (!args[0]) return message.reply('You have to ask a question.')
		responses = ["It is certain.",
			"It is decidedly so.",
			"Without a doubt.",
			"Yes - definitely.",
			"You may rely on it.",
			"As I see it, yes.",
			"Most likely.",
			"Outlook good.",
			"Yes.",
			"Signs point to yes.",
			"Reply hazy, try again.",
			"Ask again later.",
			"Better not tell you now.",
			"Cannot predict now.",
			"Concentrate and ask again.",
			"Don't count on it.",
			"My reply is no.",
			"My sources say no.",
			"Outlook not so good.",
			"Very doubtful."]

		var response = responses[Math.floor(Math.random() * responses.length)];

		const embed = new Discord.MessageEmbed()
			// Set the title of the field
			// Set the color of the embed
			.setColor('6FA8DC')
			// Set the main content of the embed
			.setDescription(':8ball: `Question:` ' + args.join(' ') + '\n:8ball: `Answer:` ' + response);

		// Send the embed to the same channel as the message
		message.channel.send(embed);

	},
};














