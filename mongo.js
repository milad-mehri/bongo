const mongoose = require('mongoose')

const mongoPath = 'mongodb+srv://tutorial:ZAtm0TCQaBaAmnwo@mongodb-tutorial.vbfpr.mongodb.net/test-db?retryWrites=true&w=majority'
module.exports = async () => {
	await mongoose.connect(mongoPath, {

		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	return mongoose
}