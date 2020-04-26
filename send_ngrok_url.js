const config = require('./secrets.json');

const request = require('request-promise');
const line = require('@line/bot-sdk');

(async () =>{

  const option = {
    url: 'http://localhost:4040/api/tunnels',
    method: 'GET',
    json: true
  };
  const res = await request.get(option);
  const url = res.tunnels[0].public_url;

  // create LINE SDK config from env variables
  const client_config = {
    channelAccessToken: config.channel_access_token,
    channelSecret: config.channel_secret,
  };

  const client = new line.Client(client_config);

  const userId = config.author_id;


  client.pushMessage(userId,{type: "text", 
    text: `restart ngrok\n${config.message_url}`});
  client.pushMessage(userId,{type: "text", text:url})
})();

