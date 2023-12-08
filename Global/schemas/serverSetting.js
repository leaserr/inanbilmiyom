const { model, Schema } = require("mongoose")

const ramal31cekiyor = new Schema({
    guild: String,
    yasLimit: String,
    banLimit: String,
    jailLimit: String,
    muteLimit: String,
});

module.exports = model("serverSettings", ramal31cekiyor)


///DEVAM ET EVET EVET