const mongoose = require('mongoose')

module.exports = async () => {
	await mongoose.connect(process.ENV.mongoPath, {

		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	return mongoose
}
