module.exports = {
    conf: {
      aliases: ["kaccm","cm","yarrah"],
      name: "kaccm",
      help: "kaccm"
    },
  
    run: async (client, message, args, embed) => {

        const girlNames = ['3','10','3','21','4','72','21','32','14','54'];
        const boyNames = ['3','10','1','7','6','72','23','11','18','34','9','8'];
    
    
        const gender = Math.random() < 0.5 ? 'Kız' : 'Erkek'; // Rastgele bir cinsiyet seçimi
    
        let randomName;
     
     if (gender === 'Kız') {
       randomName = girlNames[Math.floor(Math.random() * girlNames.length)];
       // Kız çocuğu isteği mesajı
     } else {
       randomName = boyNames[Math.floor(Math.random() * boyNames.length)];
       // Erkek çocuğu isteği mesajı
     }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    
message.reply({content:`Senin yarrann **${randomName}** Cm`})
},
  };
