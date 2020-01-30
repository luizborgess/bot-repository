const axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();

var config = require('./config')



async function Verify(message) {
  try {
    const response = await axios.get(
      `https://api.guildwars2.com/v2/guild/${config.bra_id}/members`,
      { headers: { Authorization: config.AuthStr } }
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
    }
  } catch (error) {
    console.error(error);
  }
}

function Verified(message) {
  var tag = false;
  message.member.roles.find(role => {
    if (role.position > 0) tag = true;
  });
  return tag;
}

client.on("message", message => {
  var re = new RegExp("\\w+\\.\\w+");
  if (message.channel.id === config.channel_id && !message.author.bot && re.test(message.content)) {
    if (Verified(message)) message.reply("ja verificado!");
    else Verify(message);
  }
});

client.login(config.token);