const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')
const colors = require('../design/colors.json');


module.exports = {
	name: 'blackjack',
	description: 'kick command',
	aliases: ['bj'],
	usage: 'a.blackjack <amount>',
	category: 'economy',
	cooldown: 5,

	async execute(message, args) {


		var result = await db.fetch(message.author.id)
		var bal = result.bal
		var amount = parseInt(args[0])
		if (amount === 'all' || amount === 'max') {
			(bal > 500000) ? amount = 500000 : amount = bal
		}
		if (amount === 'half') amount = bal / 2



		//errors
		if (bal > 10000000) return embeds.errorEmbed(message, 'You are** too rich **to blackjack, go do something **useful!**')
		if (!amount) return embeds.errorEmbed(message, 'You have to **say the amount** you wanna blackjack');
		if (amount > 500000) return embeds.errorEmbed(message, 'You **can\'t blackjack** more than **500k**.');
		if (amount < 50) return embeds.errorEmbed(message, 'You **can\'t blackjack less than 50 **poor kid.');
		if (bal < amount) return embeds.errorEmbed(message, 'You **only have ' + bal + ' coins**, dont try and **lie** to me bro.');

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


		//	do{

		drawcard(); drawcard(); drawcard();
		amount = parseInt(amount)

		var userAvatar = message.author.displayAvatarURL({ format: "png" })

		var bongosum = bongocards.reduce((a, b) => { return a + b });
		var playersum = cardvalues.reduce((a, b) => { return a + b });

		var embedTitle;
		var embedColor;
		var embedMessage;
		async function bjreturn() {
			if (over === true) return

			bongosum = bongocards.reduce((a, b) => {
				return a + b;
			});

			playersum = cardvalues.reduce((a, b) => {
				return a + b;
			});
			if (playersum > 21) console.log('fail')
			if (parseInt(playersum) > 21 && over === false) {
				embedMessage = 'You lose!'
				over = true
				var monkey = await db.fetch(message.author.id)
				bal = monkey.bal
				var newbal = parseInt(bal) - amount
				await db.set(message.author.id, 'bal', Math.floor(newbal))
				embedColor = colors.red
				embedTitle = ('You lose! You have ' + playersum + ', Dealer has ' + bongosum + '. You lost ' + amount + ' coins. You now have ' + newbal + '.')

			} else if (parseInt(playersum) === 21) {
				embedMessage = 'You win!'
				embedColor = colors.green
				var monkey = await db.fetch(message.author.id)
				bal = monkey.bal
				var newbal = parseInt(bal) + amount
				await db.set(message.author.id, 'bal', Math.floor(newbal))
				over = true
				embedTitle = 'You win!\nYou won ' + amount + '. Now you have ' + newbal + '.'

			} else {
				embedTitle = message.author.username + `'s Blackjack Game`

			}



			message.channel.send({
				content: '',
				embed: {
					color: embedColor,
					author: {
						name: embedTitle,
						icon_url: av
					},
					description: '',
					footer: {
						text: embedMessage
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
				embedMessage = 'You win!'
				embedColor = colors.green
				var monkey = await db.fetch(message.author.id)
				bal = monkey.bal
				var newbal = parseInt(bal) + amount
				await db.set(message.author.id, 'bal', Math.floor(newbal))

				await bjreturn()
				embedTitle = ('Bongo busted and you won! You now have ' + newbal + '.')

			}
			if (bongosum < 22 && bongosum > playersum) {
				over = true
				embedMessage = 'You lose!'
				embedColor = colors.red
				var monkey = await db.fetch(message.author.id)
				bal = monkey.bal
				var newbal = parseInt(bal) - amount
				await db.set(message.author.id, 'bal', Math.floor(newbal))
				await bjreturn()
				embedTitle = ('You lost! You now have ' + newbal + '.')
			}





			message.channel.send({
				content: '',
				embed: {
					color: embedColor,
					author: {
						name: embedTitle,
						icon_url: av
					},
					description: '',
					footer: {
						text: embedMessage
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

			drawcard()
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
			return message.channel.send('Invalid input! You lost **half** your bet!')

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
									console.log('here')
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


	},
};
