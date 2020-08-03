var config = {};

config.guild_id = '';
config.channel_id= "565607843139420169";
config.token = process.env.token;//discord dev token
config.AuthStr = "Bearer ".concat(process.env.apiToken);//game apitoken
config.prefix="!";
config.server_id ="438099048096989192";

module.exports = config;