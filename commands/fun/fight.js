const db = require('../../db.js');
const Discord = require('discord.js');
const userSchema = require('../../schemas/user-schema')


module.exports = {
	name: 'fight',
	description: 'Start a fight with another user!',
	usage: '`a.fight @user`',
  category: 'fun',

	async execute(message, args) {


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

		if (isNaN(message.mentions.users.first())) {
			return message.reply(':angry: mention someone.');
		}
		var challengerhealth = 100
		var mentionhealth = 100
		var random;
		var mentioned = message.mentions.members.first()
		if (mentioned.user === message.author) {
			return message.channel.send('You cant fight yourself -_-')
		}
		var turn = random = Math.floor(Math.random() * 2 + 1);
		var go;
		var health;

		var stop;


		let challenger = await db.fetch(mentioned.id)
		challenger = challenger.infight
		let mention = await db.fetch(message.author.id)

		mention = mention.infight

		if (mentioned.id === '780943575394942987') {
			return message.channel.send(mentioned.user.username + ' brought a gun to the fight and killed you!')
		}
		if (challenger === true) {
			return message.channel.send(mentioned.user.username + ' is currently in a fight!')
		}

		if (mention === true) {
			return message.channel.send(message.author.username + ' is currently in a fight!')
		}
		await db.set(message.author.id, 'infight', true)

		await db.set(mentioned.id, 'infight', true)
		var b;
		do {
			if (turn === 1) {
				re(message.author.username + 's turn', 'Choose: `attack` or `defend`')
				go = message.author
				stop = mentioned.user
				random = Math.floor(Math.random() * mentionhealth + 20);
				health = mentionhealth

			} else {
				re(mentioned.user.username + 's turn', 'Choose: `attack` or `defend`')
				go = mentioned.user
				stop = message.author
				random = Math.floor(Math.random() * challengerhealth + 20);
				health = challengerhealth


			}






			await message.channel.awaitMessages(m => m.author.id == go.id,
				{ max: 1, time: 10000 }).then(collected => {

					if (collected.first().content.toLowerCase() == 'punch' || collected.first().content.toLowerCase() == 'attack') {
						health -= random
						re('PUNCH! ', 'You PUNCHED ' + stop.username + ' and dealt ' + random + ' damage!! Now they have ' + health + ' health!');
						if (turn === 1) {
							mentionhealth = health


						} else {
							challengerhealth = health


						}


					} else if (collected.first().content.toLowerCase() == 'defend') {
						if (turn === 1) {
							health = challengerhealth
							random = Math.floor(Math.random() * 20 + 1);


						} else {
							health = mentionhealth
							random = Math.floor(Math.random() * 20 + 1);


						}

						health += random
						re('Healing... ', 'You healed yourself and increased your health by ' + random + ' points!! Now you have ' + health + ' health!');

						if (turn === 1) {
							challengerhealth = health


						} else {
							mentionhealth = health


						}

					}

					else
						message.channel.send('Invalid input! :angry: You lose  your turn ');
				}).catch(() => {
					message.reply('no answer after 5 seconds, ' + go.username + ' loses the fight!');
					if (turn === 1) {
						challengerhealth = 0


					} else {
						mentionhealth = 0


					}
				});











			if (turn === 1) {
				turn = 2


			} else {
				turn = 1

			}
		} while (challengerhealth > 0 && mentionhealth > 0)
		await db.set(mentioned.id, 'infight', false)
		await db.set(message.author.id, 'infight', false)




		if (challengerhealth > 0) {
			await db.set(message.author.id, 'infight', false)

			await db.set(mentioned.id, 'infight', false)
			re(`${message.author.username} won!`, `${message.author.username} won the fight with ${challengerhealth} health left!`)
		} else {
			re(`${mentioned.user.username} won!`, `${mentioned.user.username} won the fight with ${mentionhealth} health left!`)
		}






	},
};
