var express = require('express');
var jade = require('jade');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  if (logMessages.length >= conf.maxLines) {
    logMessages.shift()
  }
  
  var lines = []
  req.body.forEach(function(line){
    logMessages.push(line)
    lines.push(line)
  })

  fs.readFile('views/modules/line.jade', 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    var fn = jade.compile(data)
    var html = fn({
      lines: lines
    })
    broadcast(html)
  })

  res.render('receive', { title: 'Received' });
});

module.exports = router;
