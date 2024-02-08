#### HTTPS Protocol

- ตัวอย่างการกำหนด URLs ใหม่ เพิ่มค่า แก้ไข ลบ

```js
const myURL = new URL(`https:example.org:8000/path/?abc=123#target`)
console.dir(myURL, { depth: null, color: true }) // URL {}

myURL.port = 8001 // edit
console.log(myURL.href) // https://example.org:8001/path/?abc=123#target

console.log(myURL)
```

```c
URL {
  href: 'https://example.org:1150/path/?abc=123#target',
  origin: 'https://example.org:1150',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'example.org:1150',
  hostname: 'example.org',
  port: '1150',
  pathname: '/path/',
  search: '?abc=123',
  searchParams: URLSearchParams { 'abc' => '123' },
  hash: '#target'
}
```

#### Webhook เพื่อรับ Events จาก Facebook ด้วย Node.js

1. สร้าง Web Sever สำหรับ Webhook

- https://nodejs.org/en
- https://ngrok.com/download

2. Setup Server

```js
import express from 'express'

const app = express()
const port = process.env.PORT || 8000

//TODO: กำหนดค่าอะไรก็ได้ "ต้องเหมือนกัน" กับค่าในช่องตรวจสอบโทเค็นในการสมัครรับข้อมูล
const webhookSecret = 'my_webhook_secret'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) =>
  res.type('text/html').send(`
  <h1> JavaScript Runtime Environment. </h1><br>
  <p><code> ${req.hostname} </code></p>
  `)
)

app.get('/', (req, res) => {
  try {
    if (
      req.query['hub.mode'] &&
      req.query['hub.verify_token'] === webhookSecret
    ) {
      res.send(req.query['hub.challenge'])
    } else {
      // respond '403 Forbidden' if verify tokens do not match
      res.sendStatus(403)
    }
    res.end()
  } catch (e) {}
})

app.listen(port, () =>
  console.log('Server running at http://localhost:%s', port)
)
```
