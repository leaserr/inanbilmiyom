const { Schema, model } = require("mongoose");

const secretUsers = Schema({
	guildId: String,
	userId: String,
	private_voices: {
		voiceId: {type: String, default: null},
		lock: { type: Boolean, default: true }
	}
})



module.exports = model("secretUser", secretUsers);