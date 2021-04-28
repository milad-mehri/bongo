const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
	itemname: {
		type: String,
		required: true
	},
	shopid: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	emoji: {
		type: String,
		required: true
	},

	sale: {
		default: 0,
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	inshop: {
		type: Boolean,
		required: true,
		default: false
	},



})

module.exports = mongoose.model('items', itemSchema)