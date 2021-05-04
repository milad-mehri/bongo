const userSchema = require('./schemas/user-schema')
const guildSchema = require('./schemas/guild-schema')

const Discord = require("discord.js")
const cache = new Discord.Collection();

async function fetch(id, client) {

	const user = { userid: id, bal: 1000, items: { box: 1, donut: 1 } }
	var result = cache.get(id) || await userSchema.findOne({ "userid": id }) || await new userSchema(user).save();

	/*if (!result) {
		result = await new userSchema(user).save();
		(await client.users.fetch(id)).send("Welcome to bongo!")
	}*/
	if (!cache.has(id)) cache.set(id, result);
	return result;

}


async function fetchdontmake(id) {

	const result = await userSchema.findOne({ "userid": id })
	return result;

}


//set(userid,thingtoupdate,value)
async function set(userID, thingToUpdate, value) {
	result = await userSchema.findOneAndUpdate({ "userid": userID }, { [thingToUpdate]: value })

	result = await userSchema.findOne({ "userid": userID })
	await cache.set(userID, result);
	return result
}





async function fetchguild(userID) {


	const user = {
		guildid: userID,
		disabled: {
			rob: true
		},
		premium: false
	}
	const result = cache.get(userID) || await guildSchema.findOne({ "guildid": userID }) || await new guildSchema(user).save();
	if (!cache.has(userID)) cache.set(userID, result);
	return result;



}



async function guildset(guildId, thingToUpdate, value) {

	result = await guildSchema.findOneAndUpdate({ "guildid": guildId }, { [thingToUpdate]: value })

	result = await guildSchema.findOne({ "guildid": guildId })
	await cache.set(guildId, result);
	return result
}



module.exports = {
	guildset,
	fetchguild,
	fetchdontmake,
	fetch,
	set
}