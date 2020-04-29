const config = require('./secrets.json');

const request = require('request-promise');
const line = require('@line/bot-sdk');

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

(async () =>{

  const option = {
    url: 'http://localhost:4040/api/tunnels',
    method: 'GET',
    json: true
  };
  let url = null;
  for(let i=0;i<120;i++) {
     try {
       const res = await request.get(option);
       if (res && res.tunnels && res.tunnels[0] && res.tunnels[0].public_url) {
         url = res.tunnels[0].public_url;
         break;
       }
     } catch (e) {}
     console.log(`error occured. may be ngrok staring, wait ${i} seconds`);
     await sleep(1000);
  }

  if (url == null) {
    console.log("url is not found");
    return;
  }
  // create LINE SDK config from env variables
  const client_config = {
    channelAccessToken: config.channel_access_token,
    channelSecret: config.channel_secret,
  };

  const client = new line.Client(client_config);

  const userId = config.author_id;


  client.pushMessage(userId,{type: "text", 
    text: `restart ngrok\n${config.message_url}`});
  client.pushMessage(userId,{type: "text", text:`${url}/`})
})();

