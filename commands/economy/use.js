
const db = require('../../db.js');
const Discord = require('discord.js');
const embeds = require('../../functions/embeds')

module.exports = {
	name: 'use',
	description: 'Use an item from your inventory',
	usage: '`a.use <item>`',
	category: 'economy',
	cooldown: 5,

	async execute(message, args) {
		var result = await db.fetch(message.author.id)

		var item = args[0]
		var amount = args[1]
		if (args[1] === undefined) {

			amount = 1
			item = args[0]
		}
		if (isNaN(parseInt(amount))) {
			item = args[1]
			amount = args[0]

		}

		var item = message.client.items.get(item) || message.client.items.find(cmd => cmd.aliases && cmd.aliases.includes(item));
		if(!item) return embeds.errorEmbed('Item not found!')
		if (item.cooldown) {

			if ((item.cooldown * 1000) - (Date.now() - result.cooldowns[item.name]) > 1) {
				return embeds.cooldownEmbed(message, (item.cooldown * 1000) - (Date.now() - result.itemCooldowns[item.name]));
			} else {
				result.itemCooldowns[item.name] = Date.now()
				await db.set(message.author.id, 'itemCooldowns', result.itemCooldowns)
			}
		}
		return item.execute(message, args, result, amount);





		var item = args[0]
		var amount = args[1]
		if (args[1] === undefined) {

			amount = 1
			item = args[0]
		}
		if (isNaN(parseInt(amount))) {
			item = args[1]
			amount = args[0]

		}
		if (parseInt(amount) < 1) {
			return message.reply(' you cant use negative items -_-')
		}

		if (isNaN(parseInt(amount))) {
			return message.reply(' this doesnt work, make sure to use the ID mentioned in shop')
		}

		if (item === 'ball' || item === 'balls') {




		} else if (item === 'shield') {

			return message.reply('Shields are always being used!!')

		} else if (item === 'medal') {

			return message.reply('Medals are always being used!!')

		} else if (item === 'bleach') {





			//	set(userid,thingtoupdate,value)

			let bal = result.bal


			var bleachs = result.bleach
			if (bleachs === null || bleachs < 1) { //new user

				return message.reply('you have no bleach to drink.')









			}


			var news = parseInt(bleachs) - 1
			//set(userid,thingtoupdate,value)
			result = await db.set(message.author.id, 'bleach', news)


			message.reply('You drank bleach and...')
			var random = Math.floor(Math.random() * 2 + 1);
			var randomb = Math.floor(Math.random() * 50 + 1);
			var randomc = Math.floor(Math.random() * 30 + 1);
			console.log(`${randomb}\n${randomc}`)

			if (random === 1) {
				//addd money
				console.log()
				var bbb = Math.round((parseInt(`${randomc}`) * parseInt(bal)) / 100)

				var newbal = parseInt(bal) + bbb
				result = db.set(message.author.id, 'bal', newbal)

				return message.channel.send('your video of drinking bleach **went viral** and you made **$' + bbb + '** from ads!')


			} else if (random === 2) {
				//addd money
				var bbb = Math.round((parseInt(`${randomb}`) * parseInt(bal)) / 100)
				var newbal = parseInt(bal) - bbb
				result = db.set(message.author.id, 'bal', newbal)
				return message.channel.send('you almost **died** and had to spend **$' + bbb + '** on hospital treatments!')


			}


		} else if (item === 'donut' || item === 'donuts') {


			let donuts = result.donut

			if (donuts === null || donuts < 1) { //new user

				return message.reply('you have no donuts to eat.')









			} else {

				if (amount > donuts) {
					return message.reply('you dont have that many donuts!')
				}

				let bal = result.bal





				donuts = result.donut

				var news = parseInt(donuts) - parseInt(amount)
				result = await db.set(message.author.id, 'donut', news);




				var random = Math.floor(Math.random() * (115 - 25 + 1) + 25);

				var i;
				var v = 0;
				for (i = 0; i < amount; i++) {
					random = Math.floor(Math.random() * (115 - 25 + 1) + 25);
					v += random


				}


				var newbal = parseInt(bal) + parseInt(v);
				db.set(message.author.id, 'bal', newbal);
				message.reply('you ate your ' + amount + ' donut(s) and made $' + v + ' coins :doughnut:  ')





			}





		} else if (item === 'clover' || item === 'clovers' || item === 'four') {

			var result = await db.fetch(message.author.id)
			var clovercd = result.clovercd
			let lastGamble = parseInt(result.clovercooldown + '000')
			if (lastGamble !== null && clovercd - (Date.now() - lastGamble) > 0) {
				// If user still has a cooldown
				let timeObj = clovercd - (Date.now() - lastGamble);
				var multi = result.gamblingmulti

				re(
					'Woah slow down',
					`You already have a active clover with ` + '`' + timeObj / 1000 + '`s before it expires. You currently have a `' + multi + '%` multiplier'
				);
				return;
			}


			let clovers = result.clover
			if (clovers === null || clovers < 1) { //new user

				return message.reply('you have no clovers to use.')









			} else {

				if (amount > 1) {
					return message.reply('You can only use 1 clover at a time!')
				}






				bal = result.bal
				clovers = result.clover

				var news = parseInt(clovers) - parseInt(1)
				db.set(message.author.id, 'clover', news);




				var v = Math.floor(Math.random() * (15) + 1);
				var a = Math.floor(Math.random() * (10) + 1);


				if (Math.floor(Math.random() * 7 + 1) === 5) {
					let cloveremoji = "<:three_leaf_clover:797758556480208896>";

					return message.reply('you tried using your clover but realized it was a 3-leaf ' + cloveremoji)
				}


				message.reply('you used 1 clover and got a `' + v + '%` increase in gambling for `' + a + '` minutes')

				db.set(message.author.id, 'gamblingmulti', v)
				var time = parseInt(Date.now().toString().slice(0, -3))
				db.set(message.author.id, 'clovercd', parseInt(a * 1000 * 60))
				db.set(message.author.id, 'clovercooldown', parseInt(time))





			}













		} else if (item === 'box' || item === 'common') {



			let boxs = result.box

			if (isNaN(boxs) || boxs < 1) { //new user

				return message.reply('you have no boxes to open.')









			} else {

				if (amount > boxs) {
					return message.reply('you dont have that many boxes!')
				}

				let bal = result.bal



				var l;

				boxs = result.box

				var news = parseInt(boxs) - parseInt(amount)
				result = await db.set(message.author.id, 'box', news);






				var v = Math.floor(Math.random() * (10000) + 1) * parseInt(amount)
				var a = Math.floor(Math.random() * (10) + 1) * parseInt(amount)

				var donuts = result.donut



				var clovers = result.clover


				var newbal = parseInt(bal) + parseInt(v);
				await db.set(message.author.id, 'bal', newbal);
				var newdonut = parseInt(donuts) + parseInt(a);
				await db.set(message.author.id, 'donut', newdonut);

				message.reply('you opened ' + amount + ' common box(s) and made `$' + v + ' coins` and `' + a + ' donuts` :doughnut:  ')

			}

		}


	},
};

