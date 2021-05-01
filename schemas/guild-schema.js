const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
	guildid: {
		type: String,
		required: true
	},
	premium: {
		default: false,
		type: Boolean,
		required: true
	},
	disabled: {
		type: Object,
		required: true,
		default: {}
	}



})

module.exports = mongoose.model('guilds', guildSchema)