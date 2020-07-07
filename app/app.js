const config = require('./secrets.json');
const express = require('express');
const app = express();

// for googlehome
const googlehome = require('google-home-notifier');
const language = 'ja';

function googlehome_init() {
  googlehome.device(config.googlehome_name, language);
}

global.googlehome_speak = function(text) {
  googlehome.notify(text, function (res) {
    console.log('googlehome_res : ' + res + '   speech_text : ' + text);
  });
}

googlehome_init();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', require('./routes/line.js'));
app.use('/morning', require('./routes/morning.js'));

app.listen(config.server_port);
console.log(`listen on port ${config.server_port}`);
