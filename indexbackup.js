const axios = require("axios");
const bra_id ="A2E4A385-43AC-E511-80D4-E4115BDFF975";
const AuthStr = 'Bearer '.concat(	
"862161E8-B324-5547-A1CA-453441D4CC7C9B4BA32B-058D-46B7-9870-C4B09728A43F")


const Discord = require('discord.js');
const token = process.env.token;
const client = new Discord.Client();


client.once('ready', () =>{
    //console.log('Ready!')
})


client.on('message', (message) =>{
    if(message.channel.id === '670706768078307356' && message.content){

        axios.get(`https://api.guildwars2.com/v2/guild/${bra_id}/members`  , { headers: { Authorization: AuthStr } })
        .then(function (response) {
            
            
            //console.log(message.content);
           
            for (var i = 0; i < response.data.length; i++){
                if (response.data[i].name == message.content){
                    //console.log(response.data[i].name)
                    var role = message.guild.roles.find(role => role.name === "putarole");
                    message.member.addRole(role);
                    
                    client.channels.get(`670706768078307356`).send(`Verificado!`)
                }
              }    
        })
        .catch(function (error) {
            // handle error
            //console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

})

client.login(token);
