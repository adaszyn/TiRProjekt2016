var express = require('express');
var app = express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: __dirname + '/storage' });
var fs = require('fs');

var totalSize = 523530;

function getSumOfSizes(callback) {
    require('du')(__dirname + '/storage', function (err, size) {
      callback(size)
    })
}

function getFileNames(dirname, callback) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {

        return;
      }

      callback(filenames);
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
  getSumOfSizes(function(size){
    res.json({
      size: size,
      total: totalSize
    })
  })
});


app.get('/api/files', function(req, res) {
  getFileNames(__dirname + '/storage', function(result) {
    res.json(result)
  })

});






app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
