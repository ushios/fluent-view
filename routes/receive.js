var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (logMessages.length >= conf.maxLines) {
    logMessages.shift()
  }

  logMessages.push('hoge')

  res.render('receive', { title: 'Received' });
});

module.exports = router;
