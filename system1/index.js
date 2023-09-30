const https = require('https')
var express = require('express')
var cookieParser = require('cookie-parser')
const fs = require('fs');

var app = express()
app.use(cookieParser())

app.get('/', function(req, res){
   // 3rdパーティCookieを設定
   res.cookie('1stPartyCookie', `hoge`, { domain: 'hoge.com', path: '/', httpOnly: true, sameSite: 'lax' })
   // 中でhttps://fuga.com:7777/cookie.jsを読み込んでる
   fs.readFile('./index.html', 'UTF-8', function (_err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(data)
    res.end()
  })
})

const options = {
  key: fs.readFileSync('hoge.com.local-key.pem'),
  cert: fs.readFileSync('hoge.com.local.pem')
}

https.createServer(options, app).listen(9999, () => {
  console.info('Listening on ' + 9999)
})
