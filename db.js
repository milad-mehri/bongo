const mongo = require('./mongo')
const userSchema = require('./schemas/user-schema')

const guildSchema = require('./schemas/guild-schema')
const Discord = require('discord.js')

module.exports = (client) => { }

const cache = new Discord.Collection();
module.exports.fetch = async (id, client) => {
	return await mongo().then(async mongoose => {
		const user = { userid: id, bal: 1000, items:{box:1} }
		const result = cache.get(id) || await userSchema.findOne({ "userid": id }) || await new userSchema(user).save();
		if (!cache.has(id)) cache.set(id, result);
		return result;
	})
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





module.exports.fetchguild = async (userID) => {
	return await mongo().then(async mongoose => {



		const user = {
			guildid: userID,
			diabled: {
				rob: true
			},
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



