const mongo = require('./mongo')
const userSchema = require('./schemas/user-schema')
const itemSchema = require('./schemas/item-schema')

const guildSchema = require('./schemas/guild-schema')
const Discord = require('discord.js')

module.exports = (client) => { }

const cache = new Discord.Collection();
module.exports.fetch = async (id, client) => {
	return await mongo().then(async mongoose => {
		const user = { userid: id, bal: 1000, box: 1 }
		const result = cache.get(id) || await userSchema.findOne({ "userid": id }) || await new userSchema(user).save();
		if (!cache.has(id)) cache.set(id, result);
		return result;
	})
}

module.exports.shop = async (shopid) => {
	return await mongo().then(async mongoose => {

		const result = cache.get(shopid) || await itemSchema.findOne({ "shopid": shopid })
		if (!cache.has(shopid)) cache.set(shopid, result);
		return result;
	})
}

/*
module.exports.invworth = async (id) =>{
	return await mongo().then(asy nc mongoose => {

		const user = { userid: id, bal: 1000, box: 1 }
    const result = cache.get(id) || await userSchema.findOne({ "userid": id }) || await new userSchema(user).save();
    if (!cache.has(id)) cache.set(id, result);
	var invworth = 0
  var allItems = await itemSchema.find({}).lean().exec(function (err, docs) {
		var i;
		for(i = 0; i < docs.length ; i ++){
			invworth+= result[docs[i].shopid] * docs[i].price
			console.log(invworth)
			console.log(docs[i].shopid)
			
			if(i === docs.length-1) return invworth

		}
	})

	})
}

*/






module.exports.setsale = async (shopid, thingToUpdate, value) => {
	result = await itemSchema.findOneAndUpdate({ "shopid": shopid }, { [thingToUpdate]: value })

	result = await itemSchema.findOne({ "shopid": shopid })
	await cache.set(shopid, result);
	return result
}

module.exports.fetchdontmake = async (id) => {
	return await mongo().then(async mongoose => {
		const result = await userSchema.findOne({ "userid": id })
		return result;
	})
}


//set(userid,thingtoupdate,value)
module.exports.set = async (userID, thingToUpdate, value) => {
	result = await userSchema.findOneAndUpdate({ "userid": userID }, { [thingToUpdate]: value })

	result = await userSchema.findOne({ "userid": userID })
	await cache.set(userID, result);
	return result
}



module.exports.fetchitem = async (userID, item) => {
	return await mongo().then(async mongoose => {
		const user = {
			userid: userID,
			bal: 1000,
			box: 1
		}
		console.log(await userSchema.findOne({ "userid": userID }))
		const result = cache.get(userID) || userSchema.findOne({ "userid": userID }) || await new userSchema(user).save();
		if (!cache.has(userID)) cache.set(userID, result);

		return result[item]

	})
}





module.exports.fetchguild = async (userID) => {
	return await mongo().then(async mongoose => {



		const user = {
			guildid: userID,
			rob: true,
			premium: false
		}
		const result = cache.get(userID) || await guildSchema.findOne({ "guildid": userID }) || await new guildSchema(user).save();
		if (!cache.has(userID)) cache.set(userID, result);
		return result;



	})
}


async function fetchGuild(id) {
	return await mongo().then(async mongoose => {



		const user = {
			guildid: userID,
			rob: false,
			premium: false
		}
		const result = cache.get(id) || await guildSchema.findOne({ "guildid": id }) || await new guildSchema(user).save();
		if (!cache.has(id)) cache.set(id, result);
		return result;



	})
}



module.exports.guildset = async (userID, thingToUpdate, value) => {
	/*		const user = await fetchUser(userID);
user[thingToUpdate]= value;
user.save();
*/
	result = await guildSchema.findOneAndUpdate({ "guildid": userID }, { [thingToUpdate]: value })

	result = await guildSchema.findOne({ "guildid": userID })
	await cache.set(userID, result);
	return result
}



