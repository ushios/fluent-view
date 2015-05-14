var express = require('express');
var jade = require('jade');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  
  var lines = req.body

  if(!Array.isArray(lines)){
    lines = [lines]
  }

  var lineStrings = []

  lines.forEach(function(line){
    var string = ""
    Object.keys(line).forEach(function(key) {
      var val = line[key]
      string += "[" + key + ":" + val + "] "
    })

    lineStrings.push(string)
    if (logMessages.length >= conf.maxLines) {
      logMessages.shift()
    }
    logMessages.push(string)
  })

  fs.readFile('views/modules/line.jade', 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    var fn = jade.compile(data)
    var html = fn({
      lines: lineStrings
    })
    broadcast(html)
  })

  res.render('receive', { title: 'Received' });
});

module.exports = router;
