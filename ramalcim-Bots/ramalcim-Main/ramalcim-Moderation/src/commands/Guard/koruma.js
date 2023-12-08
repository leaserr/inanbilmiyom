const { PermissionsBitField, ButtonStyle, ComponentType, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const SafeMember = require("../../../../../ramalcim-Guard/src/Models/Koruma");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    conf: {
      aliases: ["koruma"],
      name: "koruma",
      help: "koruma",
      category: "Sahip",
      owner: true,    
  },

  run: async (client, message, args, embed, interaction) => {

        const ac = new ButtonBuilder()
        .setCustomId("aç")
        .setLabel("Koruma Aç")
        .setStyle(ButtonStyle.Success)
      
        const kapa = new ButtonBuilder()
        .setCustomId("kapat")
        .setLabel("Koruma Kapat")
        .setStyle(ButtonStyle.Danger)
    

        const row = new ActionRowBuilder()
        .addComponents([ac, kapa])


        const embeds = new EmbedBuilder()
        .setDescription(`Yt Açma Kapama Paneli
        `)

    message.reply({ embeds: [embeds], components: [row] })

    var filter = (interaction) => interaction.user.id === message.member.id;
    let collector = message.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, max: 1, time: 20000 })

    collector.on("collect", async (interaction) => {
    if(interaction.customId === "aç") {
      const perms = [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageEmojisAndStickers, PermissionsBitField.Flags.ManageWebhooks];
      let roller = interaction.guild.roles.cache.filter(rol => rol.editable).filter(rol => perms.some(yetki => rol.permissions.has(yetki)))

    if(message) message.edit({embeds: [embed.setDescription(`Başarıyla Sunucunun Tüm yöneticileri kapandı ${roller.map(x => x).join(", ")}`)], components: [row]})

      roller.forEach(async (rol) => {
        await SafeMember.updateOne({ Role: rol.id }, {$set: {"guildID": interaction.guild.id, "Permissions": rol.permissions.bitfield }}, {upsert: true})
        await rol.setPermissions(0n)
      })
  }
        
    if(interaction.customId === "kapat") {
      let veri = await SafeMember.find({});
      veri.filter(x => interaction.guild.roles.cache.get(x.Role)).forEach(async (data) => {
          let rolgetir = interaction.guild.roles.cache.get(data.Role)
          if(rolgetir) rolgetir.setPermissions(data.Permissions);
      })
      await SafeMember.deleteMany({ guildID: interaction.guild.id });
      if(message) message.edit({embeds: [embed.setDescription(`Başarıyla Sunucunun Tüm Yönetici Rolleri Açıldı`)


    ]
}
      )
}
    }
    )
}
}