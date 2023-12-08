const moment = require("moment")
require("moment-duration-format");
const conf = require("../../../../src/configs/sunucuayar.json");
const { ramal_Yes } = require("../../../../src/configs/emojis.json");
const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const SafeMember = require("../../../../../ramalcim-Guard/src/Models/Safe")
module.exports = {
  conf: {
    aliases: ["favelcimekle","favelcim","gekle"],
    name: "favelcimekle",
    help: "favelcimekle",
    category: "kullanıcı",
    owner: true,
},

  run: async (client, message, args, embed) => {
let ramalGuardiSikiyor = await SafeMember.findOne({ guildID: message.guild.id });
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) {
        return message.reply({ content: "Güvenli Eklemek İçin bir kullanıcı etiketle!" });
    }

    const row = new ActionRowBuilder()
    
    .addComponents(
        new StringSelectMenuBuilder()
          .setPlaceholder('Güvenli Menüsü!')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
            label: "Full Güvenli",
            value: "full",
            description: "full ekleyince kullanıcıyı bot asla engellemez",

          },
          { 
            label: "Rol-Channel",
            value: "rolkanal",
            description: "Rol ve Kanal erisişimine izin verir.",

          },
          { 
            label: "Role",
            value: "rol",
            description: "Rol erişimine izin verir",

          },
          { 
            label: "Channel",
            value: "kanal",
            description: "Kanal erişimine izin verir",

          },
          { 
            label: "Chat Guard",
            value: "chat",
            description: "metin kanallarında küfüre izin verilir",

          },
          { 
            label: "Kapat",
            description: "Menüyü kapatır.",
            value: "closeMenu",
          }
        ])
        );


      
       

const Ramal = new EmbedBuilder()
.setDescription(`${member} Kullanıcını güvenli eklemek istiyorsanız menüye tıklayın.

**Not:** Full güvenlisini sadece güvendiğiniz kişileri alın!`)

.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
let msg = await message.channel.send({ embeds: [Ramal], components : [ row],})
            message.react(`${client.emojis.cache.find(x => x.name === "ramal_Yes")}`);
            const filter = i => i.user.id == message.author.id 
            const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });

            collector.on("collect", async (interaction) => {

             if(interaction.values[0] == "full") {
            
    await SafeMember.findOneAndUpdate({ guildID: message.guild.id }, {$push: {Full: member.id}}, { upsert: true });
    const ilgi = new EmbedBuilder()
    .setDescription(`${member} Kullanıcısı başarıyla güvenli \`Full\` listesine eklendi`) 

            interaction.update({ embeds: [ilgi], ephemaral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		
                if(interaction.values[0] == "rolkanal") {
                    await SafeMember.findOneAndUpdate({ guildID: message.guild.id }, {$push: {RoleAndChannel: member.id}}, { upsert: true });           
    const süründür = new EmbedBuilder()
    .setDescription(`${member} Kullanıcısı başarıyla güvenli \`RoleAndChannel\` listesine eklendi`) 

    interaction.update({ embeds: [süründür], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


    if(interaction.values[0] == "rol") {
        await SafeMember.findOneAndUpdate({ guildID: message.guild.id }, {$push: {Role: member.id}}, { upsert: true });
        const öp = new EmbedBuilder()
        .setDescription(`${member} Kullanıcısı başarıyla güvenli \`Role\` listesine eklendi`)

        interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


        if(interaction.values[0] == "kanal") {
            await SafeMember.findOneAndUpdate({ guildID: message.guild.id }, {$push: {Channel: member.id}}, { upsert: true });
            const öp = new EmbedBuilder()
            .setDescription(`${member} Kullanıcısı başarıyla güvenli \`Channel\` listesine eklendi`)
                            
            interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}
            
            
            if(interaction.values[0] == "chat") {
                await SafeMember.findOneAndUpdate({ guildID: message.guild.id }, {$push: {ChatG: member.id}}, { upsert: true });
                const ramalcokseksi = new EmbedBuilder()
                .setDescription(`${member} Kullanıcısı başarıyla güvenli \`Chat\` listesine eklendi`)
                                
                interaction.update({ embeds: [ramalcokseksi], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}

                    if(interaction.values[0] == "closeMenu") {
                        interaction.message.delete()					
                    }
                
                        

                    
                
                })

}
}
