const express = require('express'),
  app = express(),
  path = require('path'),
  multer = require('multer'),
  progressStream = require('progress-stream'),
  upload = multer({
    storage:
      multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, 'uploads/'))
        },
        filename: function (req, file, cb) {
          console.log(file)
          cb(null, file.originalname)
        }
      })
  })


app.post('/uploadimg', function (req, res, next) {
  // 创建progress stream的实例
  let progress = progressStream({length: '0'}); // 注意这里 length 设置为 '0'
  req.pipe(progress);
  progress.headers = req.headers;

  // 获取上传文件的真实长度（针对 multipart)
  progress.on('length', function nowIKnowMyLength(actualLength) {
    console.log('actualLength: %s', actualLength);
    progress.setLength(actualLength);
  });

  // 获取上传进度
  progress.on('progress', function (obj) {
    console.log('progress: %s', obj.percentage);
  });

  // 实际上传文件
  upload.single('file')(progress, res, next);

});
app.post('/uploadimg', function (req, res, next) {
  res.send({msg: '上传成功!'});
});

let server = app.listen(3000, () => console.log(`app is server ${server.address().port}`))
