function _0x165d(){const _0x13555a=['193627pFCaHb','forEach','allow','rateLimit','find','push','save','findOne','channels','../models/ses','length','3129885TubMtr','permissionOverwrites','setName','setParent','../models/kategori','6181200XUVUBo','set','867090rFFXTu','8220096uYAyKa','240QLZtwW','**\x20adlı\x20ses\x20kanalı\x20tekrardan\x20oluşturuldu.','setDescription','toArray','includes','channelID','5226IActjQ','../models/yazı','get','setRequired','reply','İzinsiz\x20bir\x20şekilde\x20silinmiş\x20kategori\x20veya\x20kanalları\x20kurmanızı\x20sağlar.','options','@discordjs/builders','parentID','discord.js','cache','GUILD_CATEGORY','Sadece\x20geliştiricim\x20kullanabilir.','GUILD_VOICE','Tekrardan\x20kurmam\x20için\x20geçerli\x20bir\x20id\x20gir.','position','create','guild','kanal-kur','user','2043304sGrcTB','nsfw','deny','name','updateMany','overwrites','moment','../config/oliwjerc.json'];_0x165d=function(){return _0x13555a;};return _0x165d();}const _0x375a8e=_0x22a6;(function(_0x44e6d2,_0xca3498){const _0x4c87f1=_0x22a6,_0xb04776=_0x44e6d2();while(!![]){try{const _0x4a63eb=parseInt(_0x4c87f1(0x107))/0x1+-parseInt(_0x4c87f1(0x10f))/0x2*(parseInt(_0x4c87f1(0x109))/0x3)+-parseInt(_0x4c87f1(0x123))/0x4+parseInt(_0x4c87f1(0x136))/0x5+-parseInt(_0x4c87f1(0x105))/0x6+-parseInt(_0x4c87f1(0x12b))/0x7+parseInt(_0x4c87f1(0x108))/0x8;if(_0x4a63eb===_0xca3498)break;else _0xb04776['push'](_0xb04776['shift']());}catch(_0x4c5967){_0xb04776['push'](_0xb04776['shift']());}}}(_0x165d,0xb55c4));function _0x22a6(_0x9237ac,_0x94ab57){const _0x165d77=_0x165d();return _0x22a6=function(_0x22a643,_0x1829af){_0x22a643=_0x22a643-0x103;let _0x10f9e0=_0x165d77[_0x22a643];return _0x10f9e0;},_0x22a6(_0x9237ac,_0x94ab57);}const {SlashCommandBuilder}=require(_0x375a8e(0x116)),{Discord,WebhookClient,Permissions}=require(_0x375a8e(0x118)),Config=require(_0x375a8e(0x12a)),{green}=require(_0x375a8e(0x12a)),CategoryChannels=require(_0x375a8e(0x104)),TextChannels=require(_0x375a8e(0x110)),VoiceChannels=require(_0x375a8e(0x134)),moment=require(_0x375a8e(0x129));require('moment-duration-format'),module['exports']={'data':new SlashCommandBuilder()[_0x375a8e(0x138)](_0x375a8e(0x121))[_0x375a8e(0x10b)](_0x375a8e(0x114))['addStringOption'](_0x1391ca=>_0x1391ca['setName']('id')[_0x375a8e(0x10b)](_0x375a8e(0x11d))[_0x375a8e(0x112)](!![])),async 'execute'(_0x291e55,_0x249fd5){const _0x34bc87=_0x375a8e;if(!Config['BotOwner'][_0x34bc87(0x10d)](_0x291e55[_0x34bc87(0x122)]['id']))return _0x291e55['reply']({'content':_0x34bc87(0x11b),'ephemeral':!![]});var _0x18fb5f=_0x291e55[_0x34bc87(0x115)]['getString']('id');const _0x49f54b=await TextChannels['findOne']({'channelID':_0x18fb5f}),_0x3fb35b=await VoiceChannels[_0x34bc87(0x132)]({'channelID':_0x18fb5f}),_0x1cb049=await CategoryChannels[_0x34bc87(0x132)]({'channelID':_0x18fb5f});if(_0x49f54b){newChannel=await _0x291e55[_0x34bc87(0x120)][_0x34bc87(0x133)]['create'](_0x49f54b[_0x34bc87(0x126)],{'type':'GUILD_TEXT','nsfw':_0x49f54b[_0x34bc87(0x124)],'parent':_0x49f54b[_0x34bc87(0x117)],'position':_0x49f54b['position']+0x1,'rateLimitPerUser':_0x49f54b[_0x34bc87(0x12e)]}),await _0x291e55[_0x34bc87(0x113)]({'content':'**'+newChannel['name']+'**\x20adlı\x20yazı\x20kanalı\x20tekrardan\x20oluşturuldu.','ephemeral':!![]});const _0x5ab6a3=[];for(let _0x1b283e=0x0;_0x1b283e<_0x49f54b['overwrites'][_0x34bc87(0x135)];_0x1b283e++){const _0x2aad9a=_0x49f54b['overwrites'][_0x1b283e];_0x5ab6a3['push']({'id':_0x2aad9a['id'],'allow':new Permissions(_0x2aad9a['allow'])[_0x34bc87(0x10c)](),'deny':new Permissions(_0x2aad9a[_0x34bc87(0x125)])[_0x34bc87(0x10c)]()});}await newChannel[_0x34bc87(0x137)][_0x34bc87(0x106)](_0x5ab6a3),_0x49f54b[_0x34bc87(0x10e)]=newChannel['id'],_0x49f54b[_0x34bc87(0x131)]();return;}else{if(_0x3fb35b){newChannel=await _0x291e55['guild'][_0x34bc87(0x133)]['create'](_0x3fb35b[_0x34bc87(0x126)],{'type':_0x34bc87(0x11c),'bitrate':_0x3fb35b['bitrate'],'userLimit':_0x3fb35b['userLimit'],'parent':_0x3fb35b[_0x34bc87(0x117)],'position':_0x3fb35b['position']}),await _0x291e55[_0x34bc87(0x113)]({'content':'**'+newChannel[_0x34bc87(0x126)]+_0x34bc87(0x10a),'ephemeral':!![]});const _0x48b31d=[];for(let _0x141661=0x0;_0x141661<_0x3fb35b[_0x34bc87(0x128)][_0x34bc87(0x135)];_0x141661++){const _0x4fc204=_0x3fb35b[_0x34bc87(0x128)][_0x141661];_0x48b31d[_0x34bc87(0x130)]({'id':_0x4fc204['id'],'allow':new Permissions(_0x4fc204[_0x34bc87(0x12d)])[_0x34bc87(0x10c)](),'deny':new Permissions(_0x4fc204['deny'])[_0x34bc87(0x10c)]()});}await newChannel['permissionOverwrites'][_0x34bc87(0x106)](_0x48b31d),_0x3fb35b[_0x34bc87(0x10e)]=newChannel['id'],_0x3fb35b['save']();return;}else{if(_0x1cb049){const _0x4560bf=await _0x291e55[_0x34bc87(0x120)][_0x34bc87(0x133)][_0x34bc87(0x11f)](_0x1cb049['name'],{'type':_0x34bc87(0x11a),'position':_0x1cb049[_0x34bc87(0x11e)]+0x1});await _0x291e55['reply']({'content':'**'+_0x4560bf[_0x34bc87(0x126)]+'**\x20adlı\x20kategori\x20oluşturuluyor\x20eskiden\x20ne\x20var\x20ne\x20yok\x20hepsi\x20içine\x20koyuluyor.','ephemeral':!![]});const _0x3a6c78=await TextChannels[_0x34bc87(0x12f)]({'parentID':_0x18fb5f});await TextChannels[_0x34bc87(0x127)]({'parentID':_0x18fb5f},{'parentID':_0x4560bf['id']}),_0x3a6c78[_0x34bc87(0x12c)](_0x3358d9=>{const _0x6519a3=_0x34bc87,_0x497227=_0x291e55[_0x6519a3(0x120)][_0x6519a3(0x133)]['cache'][_0x6519a3(0x111)](_0x3358d9['channelID']);if(_0x497227)_0x497227[_0x6519a3(0x103)](_0x4560bf,{'lockPermissions':![]});});const _0x42d4c6=await VoiceChannels[_0x34bc87(0x12f)]({'parentID':_0x18fb5f});await VoiceChannels['updateMany']({'parentID':_0x18fb5f},{'parentID':_0x4560bf['id']}),_0x42d4c6[_0x34bc87(0x12c)](_0x99ea45=>{const _0x2bfff9=_0x34bc87,_0x5ee3f6=_0x291e55['guild'][_0x2bfff9(0x133)][_0x2bfff9(0x119)][_0x2bfff9(0x111)](_0x99ea45[_0x2bfff9(0x10e)]);if(_0x5ee3f6)_0x5ee3f6[_0x2bfff9(0x103)](_0x4560bf,{'lockPermissions':![]});});const _0x10a801=[];for(let _0x432a4e=0x0;_0x432a4e<_0x1cb049[_0x34bc87(0x128)][_0x34bc87(0x135)];_0x432a4e++){const _0x57c022=_0x1cb049['overwrites'][_0x432a4e];_0x10a801['push']({'id':_0x57c022['id'],'allow':new Permissions(_0x57c022['allow'])[_0x34bc87(0x10c)](),'deny':new Permissions(_0x57c022['deny'])[_0x34bc87(0x10c)]()});}await _0x4560bf['permissionOverwrites'][_0x34bc87(0x106)](_0x10a801),_0x1cb049['channelID']=_0x4560bf['id'],_0x1cb049[_0x34bc87(0x131)]();return;}}}if(!_0x49f54b||!_0x3fb35b||!_0x1cb049)return _0x291e55['reply']({'content':'Öncelikle\x20geçerli\x20bir\x20kategori/kanal\x20ID\x27si\x20belirtmelisiniz.!','ephemeral':!![]});}};