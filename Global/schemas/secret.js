const { Schema, model } = require("mongoose");

const schema = Schema({
	guildId: String,
	private_voices: {
		mode: { type: Boolean, default: false },
		categoryId: String,
		channelId: String,
		textId: String,
	}
});


module.exports = model("secret", schema);