const config = require('../secrets.json');
const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
  console.log(req.body);
  try {
     const webhook = req.body.events[0];
     if (webhook.type != 'message' || webhook.message.type != 'text') {
       return;
     }
     // 特定の人からのメッセージのみ発話
     if ((!Array.isArray(config.speakable_userids) || config.speakable_userids.some(x => x == webhook.source.userId)) && !webhook.message.text.startsWith('\n')) {
        // urlを削除
	const data_text = webhook.message.text.replace(/https?:\/\/[^\s　]+/g, '').trim();
        if (data_text != '') {
            global.googlehome_speak(config.begin_message + data_text);
	}
     }
     res.send({status:"OK"});
   } catch (e) {
    console.log(e);
    res.status(500).send({message:"error"});
  }
});

module.exports = router;
