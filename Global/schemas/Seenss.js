const { Schema, model } = require("mongoose");

const seenss = Schema({
        userID: String,
        guildID: String,
        lastSeen: Number, 
        lastSeenVoice: Number,    
        lastSeenMessage: Number,
    
        
    });

module.exports = model("Seenss", seenss);