var express = require('express');
var jade = require('jade');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  if (logMessages.length >= conf.maxLines) {
    logMessages.shift()
  }
  
  var line = req.body
  logMessages.push(line)

  var lineString = ""
  Object.keys(line).forEach(function(key) {
    var val = line[key]
    lineString += "[" + key + ":" + val + "] "
  })

  fs.readFile('views/modules/line.jade', 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    var fn = jade.compile(data)
    var html = fn({
      lines: [lineString]
    })
    broadcast(html)
  })

  res.render('receive', { title: 'Received' });
});

module.exports = router;
