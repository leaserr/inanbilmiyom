const { EmbedBuilder } = require('discord.js');
const Coins = require("../../../../../../Global/schemas/param");
const { ramal_Yes } = require("../../../../src/configs/emojis.json")
const sistem = require("../../../../src/configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["paramekle"],
    name: "paramekle",
    help: "paramekle",
    category: "stat",
  },
  
  run: async (client, message, args) => {
if(!sistem.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(red)
let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!uye) return message.channel.send("\`.paramekle <@favel/ID> <Miktar>\`");
let Miktar = parseInt(args[1]);
if(isNaN(Miktar)) return message.channel.send(`Lütfen bir miktar belirtmelisin! __Örn:__ \`.paramekle <@favel/ID> <Miktar>\``);
await Coins.updateOne({ _id: uye.id }, { $inc: { "Coin": Miktar } }, {upsert: true}).exec();
await message.react(ramal_Yes)
}
};
