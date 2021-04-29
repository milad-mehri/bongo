
const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')

module.exports = {
	name: 'search',
	description: 'Search for money in random places',
	aliases: ['scount', 'explore'],
	usage: '`a.search`',
	category: 'economy',

	async execute(message, premiumusers) {

		var result = await db.fetch(message.author.id)
		let cooldown = 7000;

		let lastsearch = parseInt(result.searchcd + '000')

		if (lastsearch !== null && cooldown - (Date.now() - lastsearch) > 0) {
			// If user still has a cooldown
			let timeObj = cooldown - (Date.now() - lastsearch);
			return embeds.cooldownEmbed(message, timeObj)
		} else {

			// Otherwise they'll get their daily

			let bal = result.bal



			var random = Math.floor(Math.random() * 28);
			var places = ['the air', "a bush", "a treehouse", "your mattress", "Santa's house", "a lighthouse", "a farmhouse", "a chicken coop", "a doghouse", "someone's backyard", "the bank", "the streets", "the river", "the ocean", "your pockets", "a cash register", "someone's roof", "the jungle", "a robber's house", "lisa's house", 'your own house', "bongo's house", "the sewers", "discord", "the bongo support server", "your moms house", "your dads house", "your bed", 'the street']
			var outputs = [Math.floor(Math.random() * 50 + 0), Math.floor(Math.random() * 50 + 0), Math.floor(Math.random() * 20 + 0), Math.floor(Math.random() * 10 + 0), Math.floor(Math.random() * 500 + 500), 0, Math.floor(Math.random() * 90 + 10), Math.floor(Math.random() * 90 + 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 90 + 10), Math.floor(Math.random() * 10 + 10), Math.floor(Math.random() * 1000 + 1000), Math.floor(Math.random() * 200 + 10), Math.floor(Math.random() * 1000 + 10), Math.floor(Math.random() * 10000 + 1000), Math.floor(Math.random() * 10 + 10), Math.floor(Math.random() * 10000 + 1000), Math.floor(Math.random() * 200 + 10), Math.floor(Math.random() * 10000 + 1000), Math.floor(Math.random() * 50 + 0), Math.floor(Math.random() * 500 + 300), Math.floor(Math.random() * 13 + 1), Math.floor(Math.random() * 500 + 1), Math.floor(Math.random() * 2000 + 1), Math.floor(Math.random() * 500 + 1), Math.floor(Math.random() * 200 + 1), Math.floor(Math.random() * 600 + 1), Math.floor(Math.random() * 200 + 1)]
			var results = ["coins.", "coins.", "coins.", "coins. You should really clean more often!", "coins because Santa doesn't need money.", "coins.", "coins.", "coins.", "coins.", "coins before being chased away by the police.", "coins.", "coins.", "coins worth of gold.", "coins worth of treasure before swimming away from the sharks.", "coins.", "coins.", "coins. People put money in strange places...", "coins in a temple before getting nipped by the booby traps.", "coins.", "coins, but they banned you!!", 'coins.', "coins but they **increased your cooldown**.. just for 1 command tho", "coins.", "coins. **How** th?", "coins. You also recieved a **5 minute mute**... \njk..", "coins.", "coins.", "coins."]
			var embed = new Discord.MessageEmbed().setImage('https://i.ibb.co/QpY1Nj0/image.gif')

			var embedb = new Discord.MessageEmbed().setDescription('<@' + message.author + '>, you searched in **' + places[random] + '** and found **' + outputs[random] + '** ' + results[random])

			message.channel.send(embed).then(msg => {
				setTimeout(function () {
					msg.edit(embedb)

				}, 3000);
			})

			var newbal = parseInt(bal) + parseInt(outputs[random]);

			await db.set(message.author.id, 'bal', newbal);


			if (random === 0) {
				var time = parseInt(Date.now().toString().slice(0, -3)) + 5
				await db.set(message.author.id, 'searchcd', time);

			} else {
				var time = parseInt(Date.now().toString().slice(0, -3))
				await db.set(message.author.id, 'searchcd', time);

			}

		}






































	},
};
















