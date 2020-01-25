const axios = require("axios");
const bra_id = "A2E4A385-43AC-E511-80D4-E4115BDFF975";
const AuthStr = "Bearer ".concat(process.env.apiToken);

const Discord = require("discord.js");
const token = process.env.token;

const client = new Discord.Client();

//client.once("ready", () => {
//console.log('Ready!')
//});

async function getUser(message) {
  try {
    const response = await axios.get(
      `https://api.guildwars2.com/v2/guild/${bra_id}/members`,
      { headers: { Authorization: AuthStr } }
    );

    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i].name == message.content) {
        //console.log(response.data[i].name)
        var role = message.guild.roles.find(role => role.name === "Cadete");
        message.member.addRole(role);
        //console.log("hihi")
        client.channels.get(`565607843139420169`).send(`Verificado!`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

client.on("message", message => {
  if (message.channel.id === "565607843139420169" && message.content) {
    getUser(message);
  }
});

client.login(token);
