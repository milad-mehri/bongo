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
	},
	busbal: {
		type: Number,
	},
	busbal: {
		type: Number,
		required: false,
	},
	bal: {
		default: 1000,
		type: Number,
		required: true
	},
	ball: {
		type: Number,
	},
	shield: {
		type: Number,
	},
	medal: {
		type: Number,
	},
	common: {
		type: Number,
	},
	rare: {
		type: Number,
	},
	diamond: {
		type: Number,
	},
	bleach: {
		type: Number,
	},
	clover: {
		type: Number,
	},
	box: {
		type: Number,

	},
	donut: {
		type: Number,

	},
	rod: {
		type: Number,

	},
	enteredlottery: {
		type: Boolean,
		default: false,
	},
	autolottery: {
		type: Boolean,
		default: false,
	},
	lottery: {
		enteredlottery: {
			type: Boolean,
			default: false
		},
		autolottery: {
			type: Boolean,
			default: false
		}
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

	},
	rob: {
		invincibleCooldown: Number,
		invincibleStart: Number,
		robBanTime: Number,
		robBanStart: Number
	}


})

module.exports = mongoose.model('users', userSchema)