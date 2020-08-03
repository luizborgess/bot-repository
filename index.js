const axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();

var {guild_id,channel_id,AuthStr,token,server_id,prefix} = require('./config')

//find guild id
async function fetch_guild_id(){
  try {
    const response = await axios.get(
      `https://api.guildwars2.com/v2/account`,
      { headers: { Authorization: AuthStr } }
      );
    guild_id=response.data.guild_leader;
 } catch (error) {
    console.error(error);
  }
}
fetch_guild_id();

//call guild 
async function Verify(message){
  try {
    const response = await axios.get(
      `https://api.guildwars2.com/v2/guild/${guild_id}/members`,
      { headers: { Authorization: AuthStr } }
      );
      for (var i = 0; i < response.data.length; i++) {
    if (response.data[i].name == message.content) {
      //add role
      var role = message.guild.roles.find(role => role.name === "Cadete");
      message.member.addRole(role);
      
      //set nickname
      var nickname = message.member.nickname + "-" + message.content;
      message.member.setNickname(nickname);
      message.reply('Verificado!')
    }
  } } catch (error) {
    console.error(error);
  }
}

function Verified(message) {
  var tag =0;
  message.member.roles.find(role => {
    if (role.position > 0) tag = 1;
  });
  
  let guild = client.guilds.get(server_id);
  guild.members.forEach(user => {
    if(user.nickname!=null){
      if(user.nickname.includes(message.content))tag=2;
    }
  });
  return tag;
}

client.on("message", message => {
  var re = new RegExp("\\w+\\.\\w+");
  if (message.channel.id === channel_id && !message.author.bot && re.test(message.content)) {
    if (Verified(message)==1) message.reply("ja verificado!");
    else if(Verified(message)==2)message.reply(`ID: ${message.content} já foi verificado.Verifique se o ID esta digitado corretamente.`);
    else Verify(message);
  }
});

client.login(token);