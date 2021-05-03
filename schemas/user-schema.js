const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
	userid: {
		type: String,
		required: true
	},

	bal: {
		default: 1000,
		type: Number,
		required: true
	},

	banned: {
		type: Boolean,
		default: false,
	},
	premium: {
		type: Boolean,
		default: false,

	},
	gamble: {
		win: {
			type: Number,
			default: 0,
		},
		loss: {
			type: Number,
			default: 0,
		},
		multiplier: {
			amount: {
				type: Number,
				default: 0,
			},
			startTime: {
				type: Number,
				default: 0,
			},
			time: {
				type: Number,
				default: 0,
			}
		}
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
	},
	businessObject: {
		bal: Number,
		stock: {
			type: Number,
		},
		name: {
			type: String,
		}
	},
	items: {


		ball: {
			type: Number,
			default: 0,
			required: true
		},
		box: {
			type: Number,
			default: 0,
			required: true
		},
		clover: {
			type: Number,
			default: 0,
			required: true
		},
		common: {
			type: Number,
			default: 0,
			required: true
		},
		diamond: {
			type: Number,
			default: 0,
			required: true
		},
		donut: {
			type: Number,
			default: 0,
			required: true
		},
		medal: {
			type: Number,
			default: 0,
			required: true
		},
		rare: {
			type: Number,
			default: 0,
			required: true
		},
		rod: {
			type: Number,
			default: 0,
			required: true
		},
		shield: {
			type: Number,
			default: 0,
			required: true

		},
		bleach: {
			type: Number,
			default: 0,
			required: true

		},
		spray: {
			type: Number,
			default: 0,
			required: true
		}

	},
	rob: {
		"invinciblityTime": {
			type: Number,
			default: 0,
			required: true

		},
		"invincibleStart": {
			type: Number,
			default: 0,
			required: true

		},
		"banTime": {
			type: Number,
			default: 0,
			required: true

		},
		"banStart": {
			type: Number,
			default: 0,
			required: true

		}
	},
	lottery: { enteredlottery: Boolean, autolottery: Boolean }


})

module.exports = mongoose.model('users', userSchema)