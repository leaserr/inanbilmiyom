function _0x3a27(_0x38778a,_0x26b187){const _0x59f9d0=_0x59f9();return _0x3a27=function(_0x3a2722,_0x35d4f8){_0x3a2722=_0x3a2722-0x1ae;let _0x1bf0fa=_0x59f9d0[_0x3a2722];return _0x1bf0fa;},_0x3a27(_0x38778a,_0x26b187);}const _0x1fb368=_0x3a27;(function(_0x3915d6,_0x25910e){const _0x47738=_0x3a27,_0x18c4a4=_0x3915d6();while(!![]){try{const _0x504533=parseInt(_0x47738(0x1e1))/0x1*(parseInt(_0x47738(0x1d1))/0x2)+parseInt(_0x47738(0x1c4))/0x3+-parseInt(_0x47738(0x1c9))/0x4+-parseInt(_0x47738(0x1ce))/0x5+-parseInt(_0x47738(0x1b5))/0x6+-parseInt(_0x47738(0x1b0))/0x7*(parseInt(_0x47738(0x1c7))/0x8)+parseInt(_0x47738(0x1ae))/0x9;if(_0x504533===_0x25910e)break;else _0x18c4a4['push'](_0x18c4a4['shift']());}catch(_0x1422c1){_0x18c4a4['push'](_0x18c4a4['shift']());}}}(_0x59f9,0x378fe));const {SlashCommandBuilder}=require('@discordjs/builders'),{MessageEmbed,MessageActionRow,MessageSelectMenu}=require(_0x1fb368(0x1b4)),ayar=require('../config/oliwjerc.json'),SafeMember=require('../models/güvenli'),table=require(_0x1fb368(0x1cf));function _0x59f9(){const _0x59f590=['Geçerli\x20bir\x20rol\x20seç.','rol','help','join','member','setName','members','Evet','Kimse\x20eklenmedi!','length','982815UiVmiP','help2','createMessageComponentCollector','104PVejfO','Sadece\x20geliştiricim\x20kullanabilir.','490048Hfkuxx','Full','setFooter','iconURL','Güvenli\x20de\x20kimler\x20mi\x20var?\x20Merak\x20ettiysen\x20tıkla.','1158930URrNmb','table','select','1572CPAkzM','Güvenli\x20liste\x20bilgilendirme\x20için\x20tıklayınız','Güvenliye\x20eklemek\x20istediğinizden\x20emin\x20misiniz?','guild','select2','addComponents','addRoleOption','setDescription','get','map','values','catch','reply','channel','Güvenliler','Botta\x20ki\x20Güvenliler:\x20','65wKZmEo','addUserOption','setCustomId','setColor','getRole','name','cache','BLUE','options','Owner','exports','user','7674561mEhaWN','tag','176281nEFwvm','collect','includes','üye','discord.js','1932990kTApjZ','updateOne','Guard\x20botlarının\x20banlayamayacağı\x20üyeleri\x20seçersiniz.','\x20güvenliye\x20eklendi.\x20','addOptions'];_0x59f9=function(){return _0x59f590;};return _0x59f9();}module[_0x1fb368(0x1eb)]={'data':new SlashCommandBuilder()[_0x1fb368(0x1bf)]('güvenli')[_0x1fb368(0x1d8)](_0x1fb368(0x1b7))[_0x1fb368(0x1e2)](_0x4aa0d4=>_0x4aa0d4[_0x1fb368(0x1bf)](_0x1fb368(0x1b3))['setDescription']('Geçerli\x20bir\x20üye\x20seç.'))[_0x1fb368(0x1d7)](_0x440f94=>_0x440f94[_0x1fb368(0x1bf)](_0x1fb368(0x1bb))['setDescription'](_0x1fb368(0x1ba))),async 'execute'(_0x49c832,_0x4b3082){const _0x14b6ea=_0x1fb368;if(!ayar[_0x14b6ea(0x1ea)][_0x14b6ea(0x1b2)](_0x49c832[_0x14b6ea(0x1ec)]['id']))return _0x49c832[_0x14b6ea(0x1dd)]({'content':_0x14b6ea(0x1c8),'ephemeral':!![]});var _0x3eee6f=await SafeMember['findOne']({'guildID':_0x49c832[_0x14b6ea(0x1d4)]['id']})||{'Full':[],'RoleAndChannel':[],'Role':[],'Channel':[],'Bot':[],'BanAndKick':[],'ChatG':[],'Permissions':[],'SafeRole':[]},_0x4f7fbe=_0x49c832[_0x14b6ea(0x1e9)]['getMember'](_0x14b6ea(0x1b3))||_0x49c832['options'][_0x14b6ea(0x1e5)](_0x14b6ea(0x1bb));const _0x477c2f=new MessageActionRow()[_0x14b6ea(0x1d6)](new MessageSelectMenu()[_0x14b6ea(0x1e3)](_0x14b6ea(0x1d0))['setPlaceholder'](_0x14b6ea(0x1d3))['addOptions']([{'label':_0x14b6ea(0x1c1),'value':_0x14b6ea(0x1ca)}])),_0x43bd76=new MessageActionRow()[_0x14b6ea(0x1d6)](new MessageSelectMenu()[_0x14b6ea(0x1e3)](_0x14b6ea(0x1d5))['setPlaceholder'](_0x14b6ea(0x1d2))[_0x14b6ea(0x1b9)]([{'label':_0x14b6ea(0x1df),'description':'Botun\x20banlayamadığı\x20güvenlide\x20ki\x20üyeleri\x20tanıtır.','value':_0x14b6ea(0x1c5)}]));_0x4f7fbe?await _0x49c832[_0x14b6ea(0x1dd)]({'content':(_0x4f7fbe?''+_0x4f7fbe:'')+'\x20Rolünü/Üyesini\x20güvenliye\x20eklemek\x20veya\x20çıkarmak\x20istiyorsanız\x20`Evet`\x20tuşuna\x20basın.','components':[_0x477c2f]}):await _0x49c832['reply']({'content':_0x14b6ea(0x1cd),'components':[_0x43bd76]});const _0x544895=new MessageEmbed()[_0x14b6ea(0x1d8)](_0x14b6ea(0x1e0)+(_0x3eee6f[_0x14b6ea(0x1ca)][_0x14b6ea(0x1c3)]>0x0?_0x3eee6f[_0x14b6ea(0x1ca)][_0x14b6ea(0x1da)](_0x2f5372=>''+(_0x49c832[_0x14b6ea(0x1d4)][_0x14b6ea(0x1c0)][_0x14b6ea(0x1e7)][_0x14b6ea(0x1d9)](_0x2f5372)?_0x49c832[_0x14b6ea(0x1d4)][_0x14b6ea(0x1c0)][_0x14b6ea(0x1e7)][_0x14b6ea(0x1d9)](_0x2f5372):_0x49c832['guild']['roles'][_0x14b6ea(0x1e7)]['get'](_0x2f5372)))[_0x14b6ea(0x1bd)]('\x20\x0a'):_0x14b6ea(0x1c2)))['setAuthor']({'name':_0x49c832[_0x14b6ea(0x1d4)][_0x14b6ea(0x1e6)],'iconURL':_0x49c832['guild'][_0x14b6ea(0x1cc)]({'dynamic':!![]})})[_0x14b6ea(0x1e4)](_0x14b6ea(0x1e8))[_0x14b6ea(0x1cb)]({'text':_0x49c832[_0x14b6ea(0x1ec)][_0x14b6ea(0x1af)],'iconURL':_0x49c832[_0x14b6ea(0x1be)]['displayAvatarURL']({'dynamic':!![]})}),_0x265527=_0x577af4=>_0x577af4[_0x14b6ea(0x1ec)]['id']==_0x49c832['user']['id'],_0x5f4880=_0x49c832[_0x14b6ea(0x1de)][_0x14b6ea(0x1c6)]({'filter':_0x265527,'componentType':'SELECT_MENU','max':0x1,'time':0x4e20});_0x5f4880['on'](_0x14b6ea(0x1b1),async _0x1da75e=>{const _0xe064f0=_0x14b6ea;_0x1da75e[_0xe064f0(0x1db)][0x0]===_0xe064f0(0x1ca)&&(_0x3eee6f[_0xe064f0(0x1ca)]['includes'](_0x4f7fbe['id'])?(await SafeMember['updateOne']({'guildID':_0x1da75e[_0xe064f0(0x1d4)]['id']},{'$pull':{'Full':_0x4f7fbe['id']}},{'upsert':![]}),_0x1da75e[_0xe064f0(0x1dd)]({'content':(_0x4f7fbe?''+_0x4f7fbe:'')+'\x20güvenliden\x20kaldırıldı!\x20','ephemeral':![]})[_0xe064f0(0x1dc)]({})):(await SafeMember[_0xe064f0(0x1b6)]({'guildID':_0x1da75e[_0xe064f0(0x1d4)]['id']},{'$push':{'Full':_0x4f7fbe['id']}},{'upsert':![]}),await _0x1da75e[_0xe064f0(0x1dd)]({'content':(_0x4f7fbe?''+_0x4f7fbe:'')+_0xe064f0(0x1b8),'ephemeral':![]})['catch']({}))),_0x1da75e[_0xe064f0(0x1db)][0x0]===_0xe064f0(0x1bc)&&await _0x1da75e[_0xe064f0(0x1dd)]({'embeds':[embed2],'ephemeral':![]})[_0xe064f0(0x1dc)]({}),_0x1da75e[_0xe064f0(0x1db)][0x0]==='help2'&&await _0x1da75e[_0xe064f0(0x1dd)]({'embeds':[_0x544895],'ephemeral':![]})[_0xe064f0(0x1dc)]({});});}};