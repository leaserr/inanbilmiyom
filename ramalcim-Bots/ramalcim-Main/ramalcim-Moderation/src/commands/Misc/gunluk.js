const { EmbedBuilder } = require('discord.js');
const Coins = require("../../../../../../Global/schemas/param");
const { ramal_yes } = require("../../../../src/configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["gunlukal", "odulal"],
    name: "gunlukal",
    help: "gunlukal",
    category: "stat",
  },
  
  run: async (client, message, args) => {
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author);
    let uye = message.guild.members.cache.get(kullanici.id) || await message.guild.members.fetch(kullanici.id).catch(() => null);

    let Hesap = await Coins.findById({_id: uye.id}) 
        if(Hesap && Hesap.GunlukCoin) {
            let yeniGün = Hesap.GunlukCoin + (1*24*60*60*1000);
            if (Date.now() < yeniGün) {
                message.react(ramal_yes)
                return message.channel.send(`Tekrardan günlük ödül alabilmen için **${kalanzaman(yeniGün)}** beklemen gerekiyor.`)
            }
        }
    let Günlük = Math.random();
    Günlük = Günlük*(500-200);
    Günlük = Math.floor(Günlük)+200
    await Coins.updateOne({ _id: uye.id }, { $set: { "GunlukCoin": Date.now() }, $inc: { "Coin": Günlük } }, {upsert: true}).exec();
    message.react(ramal_yes)
    await message.channel.send(`${uye} başarıyla \`${Günlük}\` ödülünü aldın. **24 Saat** sonra tekrardan ödülünü alabileceksin.`)

}
};