const { EmbedBuilder } = require('discord.js');
const Coins = require("../../../../../../Global/schemas/param");
const { ramal_Yes } = require("../../../../src/configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["parat","paragonder","transfer"],
    name: "transfer",
    help: "transfer",
    category: "stat",
  },
  
  run: async (client, message, args) => {
let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author);   
let uye = message.guild.members.cache.get(kullanici.id) || await message.guild.members.fetch(kullanici.id).catch(() => null);

let Hesap = await Coins.findById(uye.id)
let Coin = Hesap ? Hesap.Coin : 0
let Gönderilen = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!Gönderilen) return message.channel.send("\`.transfer <@favel/ID> <Miktar>\`");
let Miktar = Number(args[1]);
if(isNaN(Miktar)) return message.channel.send('Hata: `Lütfen miktar yerine harf girmeyin rakam kullanın.`')
Miktar = Miktar.toFixed(0);
if(Miktar <= 0) return message.channel.send('Hata: `Göndermek istediğiniz miktar 1 dan küçük olamaz.`');
if(Coin < Miktar) return message.channel.send('Hata: `Maalesef yeterli bakiyen bulunamadı.`');
await Coins.updateOne({_id: uye.id}, { $inc: { Coin: -Miktar }}, {upsert: true})
await Coins.updateOne({_id: uye.id}, { $push: { "Transferler": { Uye: Gönderilen.id, Tutar: Miktar, Tarih: Date.now(), Islem: "Gönderilen" } }}, {upsert: true})
await Coins.updateOne({_id: Gönderilen.id}, { $push: { "Transferler": { Uye: uye.id, Tutar: Miktar, Tarih: Date.now(), Islem: "Gelen" } }}, {upsert: true})
await Coins.updateOne({_id: Gönderilen.id}, { $inc: { Coin: Miktar }}, {upsert: true})
await message.react(ramal_Yes)
await message.channel.send(`${ramal_Yes} ${Gönderilen} üyesine başarıyla \`${Miktar}\` gönderdin.`)
}
};