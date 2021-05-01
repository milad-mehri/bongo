

const db = require('../../db.js');
const Discord = require('discord.js');


module.exports = {
	name: 'bj',
	description: 'Blackjack for a chance to double your money!',
	aliases: ['blackjack'],
	usage: 'a.blackjack <amount>',
	category: 'economy',
	cooldown: 5,

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

		var result = await db.fetch(message.author.id)
		var bal = result.bal

		if (amount === 'all' || amount === 'max') {
			amount = min(parseInt(bal), 500000)
		}
		if (amount === 'half') {
			amount = parseInt(bal) / 2
		}


		if (parseInt(bal) > 10000000) {
			return message.reply('you are too rich to blackjack, go do something useful!')
		}

		var amount = args[0]
		if (!amount) {
			return message.reply(' You have to say the amount you wanna blackjack');
		}
		if (isNaN(parseInt(amount))) {
			return message.reply('you have to say the amount you wanna blackjack');
		}









		if (50 > parseInt(amount)) {
			return message.channel.send('You cant blackjack less than 50 poor kid.');
		}
		if (500000 < parseInt(amount)) {
			return message.channel.send('You cant blackjack more than 500k.');

		}

		if (parseInt(bal) < parseInt(amount)) {
			return message.channel.send(
				'You only have ' + bal + ' coins, dont try and lie to me bro.'
			);
		}

		var over = false

		const options = [2, 3, 4, 5, 6, 7, 8, 9, 10]
		const suits = ['♥', '♦', '♠', '♣']

		var cardvalues = []
		var displaycards = []

		function drawcard() {
			var randomcard = Math.floor(Math.random() * 9);
			var randomsuit = Math.floor(Math.random() * 3);

			displaycards.push('`' + suits[randomsuit] + ' ' + options[randomcard] + '` ')
			cardvalues.push(options[randomcard])
		}



		var bongocards = []
		var bongodisplaycards = []

		function drawcarda() {
			var randomcard = Math.floor(Math.random() * 9);
			var randomsuit = Math.floor(Math.random() * 3);

			bongodisplaycards.push('`' + suits[randomsuit] + ' ' + options[randomcard] + '` ')
			bongocards.push(options[randomcard])
		}
		//	do{

		drawcard()
		drawcard()
		drawcarda()
		amount = parseInt(amount)

		var av = message.author.displayAvatarURL
		/*
						const embed = new MessageEmbed()
							.setDescription(`**${message.author.username}‏‏‎** \bB‎‎‎‎‎**Bongo**\nCards - ‎‎‎‎‎${displaycards}\b\bCards - ${bongodisplaycards}`)
		
							
							.setAuthor(message.author.username +`s Blackjack Game	`, av)
							.setColor(`GREY`)
						message.channel.send(embed)
		*/
		var bustcards = 0;
		var bongosum = bongocards.reduce((a, b) => {
			return a + b;
		});

		var playersum = cardvalues.reduce((a, b) => {
			return a + b;
		});

		var broski;
		var colora;
		var mmewsage;
		async function bjreturn() {
			if (over === true) {
				return
			}
			bustcards += 1

			bongosum = bongocards.reduce((a, b) => {
				return a + b;
			});

			playersum = cardvalues.reduce((a, b) => {
				return a + b;
			});
			if (parseInt(playersum) > 21 && over === false) {
				mmewsage = 'You lose!'
				over = true
				var monkey = await db.fetch(message.author.id)
				bal = monkey.bal
				var newbal = parseInt(bal) - amount
				await db.set(message.author.id, 'bal', Math.floor(newbal))
				colora = 'RED'
				broski = ('You lose! You have ' + playersum + ', Dealer has ' + bongosum + '. You lost ' + amount + ' coins. You now have ' + newbal + '.')

			} else if (parseInt(playersum) === 21) {
				mmewsage = 'You win!'
				colora = 'GREEN'
				var monkey = await db.fetch(message.author.id)
				bal = monkey.bal
				var newbal = parseInt(bal) + amount
				await db.set(message.author.id, 'bal', Math.floor(newbal))
				over = true
				broski = 'You win!\nYou won ' + amount + '. Now you have ' + newbal + '.'

			} else if (bustcards > 4) {
				mmewsage = 'You win!'
				colora = 'GREEN'
				var monkey = await db.fetch(message.author.id)
				bal = monkey.bal
				var newbal = parseInt(bal) + amount
				await db.set(message.author.id, 'bal', Math.floor(newbal))
				over = true
				broski = ('You win $' + amount + '! You took 5 cards without going over 21. You now have ' + newbal + '.')

			} else {
				broski = message.author.username + `'s Blackjack Game`

			}



			message.channel.send({
				content: '',
				embed: {
					color: colora,
					author: {
						name: broski,
						icon_url: av
					},
					description: '',
					footer: {
						icon_url: 'https://cdn.discordapp.com/avatars/780943575394942987/b079e07a200264fc1e721bed6f74cc32.png?size=128',
						text: mmewsage
					},
					fields: [
						{
							name: `**${message.author.username}‏‏‎**`,
							value: `Cards - ‎‎‎‎‎${displaycards}\nTotal - ` + '`' + ` ${playersum} ` + '`',
							inline: true,
						},
						{
							name: '\u200B',
							value: '\u200B',
							inline: true,
						},
						{
							name: '‎‎‎‎‎**Bongo**',
							value: `Cards - ${bongodisplaycards}\nTotal - ` + '`' + ` ${bongosum} ` + '`',
							inline: true,
						}
					]
				}
			})



		}



		async function checkwinner() {
			if (bongosum > 21) {
				over = true
				mmewsage = 'You win!'
				colora = 'GREEN'
				var monkey = await db.fetch(message.author.id)
				bal = monkey.bal
				var newbal = parseInt(bal) + amount
				await db.set(message.author.id, 'bal', Math.floor(newbal))

				await bjreturn()
				broski = ('Bongo busted and you won! You now have ' + newbal + '.')

			}
			if (bongosum < 22 && bongosum > playersum) {
				over = true
				mmewsage = 'You lose!'
				colora = 'RED'
				var monkey = await db.fetch(message.author.id)
				bal = monkey.bal
				var newbal = parseInt(bal) - amount
				await db.set(message.author.id, 'bal', Math.floor(newbal))
				await bjreturn()
				broski = ('You lost! You now have ' + newbal + '.')
			}





			message.channel.send({
				content: '',
				embed: {
					color: colora,
					author: {
						name: broski,
						icon_url: av
					},
					description: '',
					footer: {
						icon_url: 'https://cdn.discordapp.com/avatars/780943575394942987/b079e07a200264fc1e721bed6f74cc32.png?size=128',
						text: mmewsage
					},
					fields: [
						{
							name: `**${message.author.username}‏‏‎**`,
							value: `Cards - ‎‎‎‎‎${displaycards}\nTotal - ` + '`' + ` ${playersum} ` + '`',
							inline: true,
						},
						{
							name: '\u200B',
							value: '\u200B',
							inline: true,
						},
						{
							name: '‎‎‎‎‎**Bongo**',
							value: `Cards - ${bongodisplaycards}\nTotal - ` + '`' + ` ${bongosum} ` + '`',
							inline: true,
						}
					]
				}
			})



		}




		function stand() {

			drawcarda()
			bongosum = bongocards.reduce((a, b) => {
				return a + b;
			});
		}



		async function losehalf() {
			var monkey = await db.fetch(message.author.id)
			bal = monkey.bal

			var newbal = parseInt(bal) - (amount / 2)
			db.set(message.author.id, 'bal', Math.floor(newbal))
			over = true
			return message.channel.send('invalid input! You lost **half **your bet!')

		}

		// START

		do {

			if (over === false) {
				await bjreturn()
				await message.channel.awaitMessages(m => m.author.id == message.author.id,
					{ max: 1, time: 30000 }).then(collected => {
						if (over !== true) {
							if (collected.first().content.toLowerCase() !== 's' && collected.first().content.toLowerCase() !== 'stand' && collected.first().content.toLowerCase() !== 'h' && collected.first().content.toLowerCase() !== 'hit') {
								if (!over) {
									losehalf()
								}
							}

							if (collected.first().content.toLowerCase() == 'h' || collected.first().content.toLowerCase() == 'hit') {
								drawcard()
								return

							} else if (collected.first().content.toLowerCase() == 's' || collected.first().content.toLowerCase() == 'stand') {

								if (over === false) {
								}
								do {
									stand()

								} while ((bongosum === playersum || bongosum < playersum) && over === false)
								over = true
								checkwinner()
								return;

							}
						}
						else

							over = true

					}).catch(() => {
						if (!over) {
							losehalf()
							over = true
						}
						return;


					});
			}
		} while (over === false)
		//ENd






	},
};
