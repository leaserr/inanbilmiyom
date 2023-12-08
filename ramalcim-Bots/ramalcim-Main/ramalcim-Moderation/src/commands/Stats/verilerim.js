const moment = require("moment")
require("moment-duration-format");
const conf = require("../../../../src/configs/sunucuayar.json");
const { ramal_Yes } = require("../../../../src/configs/emojis.json");
const Seens = require("../../../../../../Global/schemas/seens")
const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
module.exports = {
  conf: {
    aliases: ["verilerim"],
    name: "verilerim",
    help: "verilerim",
    category: "kullanıcı",
},

  run: async (client, message, args, embed) => {
    let kullArray = message.content.split(" ");
      let kullaniciId = kullArray.slice(1);
      let uye = message.mentions.members.first() || message.guild.members.cache.get(kullaniciId[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullaniciId.slice(0).join(" ") || x.user.username === kullaniciId[0]) || message.member;
      let SonGörülme = await Seens.findOne({userID: uye.id})

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!member) {
        return message.reply({ content: "Güvenli Eklemek İçin bir kullanıcı etiketle!" });
    }

    const row = new ActionRowBuilder()
    
    .addComponents(
        new StringSelectMenuBuilder()
          .setPlaceholder('İşlem Seçin!')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
            label: "Verilerim",
            value: "full",
            description: "Sunucu İçi Verilerin",

          },
          { 
            label: "Kapat",
            description: "Menüyü kapatır.",
            value: "closeMenu",
          }
        ])
        );


      
       

const Ramal = new EmbedBuilder()
.setDescription(`${member} Kullanıcını Sunucu İçi Verilerine Göz Atmak istiyorsan
Menüyü Kullan!`)

.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
let msg = await message.channel.send({ embeds: [Ramal], components : [ row],})
            message.react(`${client.emojis.cache.find(x => x.name === "ramal_Yes")}`);
            const filter = i => i.user.id == message.author.id 
            const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });

            collector.on("collect", async (interaction) => {
            
             if(interaction.values[0] == "full") {
                let platform = { web: 'İnternet Tarayıcısı', desktop: 'PC (App)', mobile: 'Mobil' }
                      let bilgi = ``
                      if(uye.presence && uye.presence.status !== 'offline') { 
                        bilgi = `${platform[Object.keys(uye.presence.clientStatus)[0]]}`
                      } else {
                        bilgi = `Çevrim-Dışı!`
                      }

                      let sonAktif = SonGörülme.lastOnline
                      let sonDeAktif = SonGörülme.lastOffline
                      let sonMesaj = SonGörülme.lastMessage
                      let sonSes = SonGörülme.lastVoice
                      let sonResim = SonGörülme.lastAvatar
                      let sonKullanıcıAdı = SonGörülme.lastUsername
                      let sonEtiket = SonGörülme.lastDiscriminator
                      let txt = ''
                if(SonGörülme.last) {
                  let type = SonGörülme.last.type
                  if(type == "ONLINE") txt = `En son <t:${String(sonAktif).slice(0, 10)}:R> çevrim-içi oldu veya cihaz değiştirdi.`
                  if(type == "OFFLINE") txt = `En son <t:${String(sonDeAktif).slice(0, 10)}:R> çevrim-dışı oldu.`
                  if(type == "VOICE") txt = `En son <t:${String(sonSes).slice(0, 10)}:R> <#${SonGörülme.last.channel}> isimli ses kanalında görüldü.`
                  if(type == "MESSAGE") txt = `Son etkinliği <t:${String(sonMesaj).slice(0, 10)}:R> <#${SonGörülme.last.channel}> isimli kanala \`${SonGörülme.last.text}\` mesajını gönderdi.`
                  if(type == "AVATAR") txt = `Son etkinliği <t:${String(sonResim).slice(0, 10)}:R> profil resmini değiştirdi.`
                  if(type == "USERNAME") txt = `Son etkinliği <t:${String(sonKullanıcıAdı).slice(0, 10)}:R> ${SonGörülme.last.old} olan kullanıcı adını ${SonGörülme.last.new} olarak değiştirdi.`
                  if(type == "DISCRIMINATOR") txt = `Son etkinliği <t:${String(sonEtiket).slice(0, 10)}:R> #${SonGörülme.last.old} olan etiketini #${SonGörülme.last.new} olarak değiştirdi.`
                }
    
    const ilgi = new EmbedBuilder()
    .setDescription(`
    Son Görülme: <t:${String(SonGörülme.lastSeen).slice(0, 10)}:R> (\`${SonGörülme.last.type}\`)
    ${sonAktif ? `Çevrim-İçi: <t:${String(sonAktif).slice(0, 10)}:R>` : `Çevrim-İçi: ~`}
    ${sonDeAktif ? `Çevrim-Dışı: <t:${String(sonDeAktif).slice(0, 10)}:R>` : `Çevrim-Dışı: ~`}
    ${sonMesaj ? `Sohbetde Görülme: <t:${String(sonMesaj).slice(0, 10)}:R>` : `Sohbetde Görülme: ~`}
    ${sonSes ? `Seste Görülme: <t:${String(sonSes).slice(0, 10)}:R>` : `Seste Görülme: ~`}
    ${sonResim ? `Resim Güncelleme: <t:${String(sonResim).slice(0, 10)}:R>` : `Resim Güncelleme: ~`}
    ${sonKullanıcıAdı ? `Kullanıcı Adı Güncelleme: <t:${String(sonKullanıcıAdı).slice(0, 10)}:R>` : `Kullanıcı Adı Güncelleme: ~`}
    ${sonEtiket ? `Etiket Güncelleme: <t:${String(sonEtiket).slice(0, 10)}:R>` : `Etiket Güncelleme: ~`}
    ${txt ? txt : ''}`) 

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
