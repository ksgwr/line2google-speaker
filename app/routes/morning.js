const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  global.googlehome_speak('おはようございます');
  res.json({
     message:"Good Morning"
  });
});

module.exports = router;
