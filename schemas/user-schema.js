const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	userid: {
		type: String,
		required: true
	},
	business: {
		type: String,
		required: false
	},
	busstock: {
		type: Number,
		required: false,
		default: 0,
	},
	busbal: {
		type: Number,
		required: false,
		default: 0,
	},
	bal: {
		default: 1000,
		type: Number,
		required: true
	},
	ball: {
		type: Number,
		default: 0,
	},
	shield: {
		type: Number,
		default: 0,
	},
	medal: {
		type: Number,
		default: 0,
	},
	common: {
		type: Number,
		default: 0,
	},
	rare: {
		type: Number,
		default: 0,
	},
	diamond: {
		type: Number,
		default: 0,
	},
	bleach: {
		type: Number,
		default: 0,
	},
	clover: {
		type: Number,
		default: 0,
	},
	box: {
		type: Number,
		default: 1,

	},
	donut: {
		type: Number,
		default: 1,

	},
	rod: {
		type: Number,
		default: 0,

	},
	enteredlottery: {
		type: Boolean,
		default: false,
	},
	autolottery: {
		type: Boolean,
		default: false,
	},
	banned: {
		type: Boolean,
		default: false,
	},
	premium: {
		type: Boolean,
		default: false,

	},
	win: {
		type: Number,
		default: 0,
	},
	loss: {
		type: Number,
		default: 0,
	},

	infight: {
		type: Boolean,
	},
	clovercooldown: {
		type: Number,
	},
	clovercd: {
		type: Number,
	},

	cooldowns: {
		type: Object,
		required: true,
		default: {}
	},
	itemCooldowns: {
		type: Object,
		required: true,
		default: {}
	}

})

module.exports = mongoose.model('users', userSchema)