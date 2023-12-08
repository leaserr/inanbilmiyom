const { EmbedBuilder } = require('discord.js');
const Coins = require("../../../../../../Global/schemas/param");

module.exports = {
  conf: {
    aliases: ["param", "coinim"],
    name: "coinim",
    help: "coinim",
    category: "stat",
  },
  
  run: async (client, message, args) => {
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author);
    let uye = message.guild.members.cache.get(kullanici.id) || await message.guild.members.fetch(kullanici.id).catch(() => null);

    let Coin = await Coins.findById(kullanici.id);

    const coinMiktari = Coin ? Coin.Coin : 0;

    const embed = new EmbedBuilder()
      .setDescription(`${kullanici} üyenin güncel hesabında \`${coinMiktari}\` bulunmakta.`);

    message.channel.send({ embeds: [embed] });
  }
};
