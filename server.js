var express = require('express');
var app = express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: __dirname + '/storage' });
var fs = require('fs');

var totalSize = 8235300;

function getSumOfSizes() {
  return new Promise(function(res, rej) {
    require('du')(__dirname + '/storage', function (err, size) {
      console.log('size', size)
      res(size);
    })

  });

}
app.use(express.static('public'));

app.get('/api', function (req, res) {
  res.send('Hello!');
});



app.post('/api/upload', multipartMiddleware, function(req, res) {
   var file = req.files[0];
   console.log('received', JSON.stringify(req.files));
   res.json('ok');
});

app.get('/api/capacity', function(req, res) {
  getSumOfSizes().then(function(size){
    res.json({
      size: String(size),
      total: totalSize
    })
  });

});





app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
