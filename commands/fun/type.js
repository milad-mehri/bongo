const Discord = require('discord.js');


const db = require('../../db.js');


module.exports = {
		name: 'type',
	description: 'Start a multiplayer typing race',
	usage: '`a.type`',
  category: 'fun',

	async execute(message,args ) {
			function re(a, b) {//embed function
		const embed = new Discord.MessageEmbed()
			// Set the title of the field
			.setTitle(a)
			// Set the color of the embed
			.setColor('6FA8DC')
			// Set the main content of the embed
			.setDescription(b);

		// Send the embed to the same channel as the message
		message.channel.send(embed);
	}
var result =await  db.fetch(message.author.id)

let cooldown = 60000; // 12 hours in ms

		let lastBeg = parseInt(result.typecd + '000')

		if (lastBeg !== null && cooldown - (Date.now() - lastBeg) > 0) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lastBeg);
			return re(
				'Woah slow down',
				`You have to wait` + '`' + timeObj / 1000 + '`s before making another race.'
			);
		}else{
			var time = Date.now().toString().slice(0, -3)
	await db.set( message.author.id, 'typecd', time)
		}
var strings = [
	'It\'s everyday bro with the disney channel flow',
	'The quick brown fox jumps over the lazy dog',
	'Ball Corporation is an American company headquartered in Westminster, Colorado',
	'Monkey exists to build communities.',
	'Scooby doo very bad',
	'You dibnt notice this spelling mitsake',
	'Lorem ipsum dolor sit amet.'
]
var encodedText = ''

var text = strings[Math.floor(Math.random() * strings.length)]
text.split``.forEach(a=>encodedText+= a + '󠀠')
re('Type the following: ', encodedText)	
await message.channel.awaitMessages(m => m.content.toLowerCase() === text.toLowerCase(),
				{ max:1 ,time: 60000 }).then(async collected => {
					return message.channel.send(`<@${collected.first().author.id}> won the typing race!`)
				}).catch(() => {
          message.reply('No one won the typing race :(')
					// do whatever here
				})

	},
};














