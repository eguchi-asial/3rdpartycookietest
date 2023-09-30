const https = require('https')
const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')

const app = express()
app.use(cookieParser())

app.get('/', function(_req, res){
   // 3rdパーティCookieを設定
   fs.readFile('./index.html', 'UTF-8', function (_err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(data)
    res.end()
  })
})

app.get('/cookie.js', function(_req, res){
  fs.readFile('./cookie.js', 'UTF-8', function (_err, data) {
    res.writeHead(200, {'Content-Type': 'text/javascript'})
    res.write(data)
    res.end()
  })
})

const options = {
  key: fs.readFileSync('fuga.com-key.pem'),
  cert: fs.readFileSync('fuga.com.pem')
}

https.createServer(options, app).listen(7777, () => {
  console.info('Listening on ' + 7777)
})
