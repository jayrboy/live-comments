import https from 'https'
import fs from 'fs'
import express from 'express'

import webhooks from './router/webhooks.js'

// import './modules/facebook/facebook.js'

const app = express()
const cfg = {
  port: process.env.PORT || 443,
}

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) =>
  res.send(`
  <h1>Created an Ngrok Web Server</h1> <br>
  <p>hostname: <code>${req.hostname}</code> </p>
  <a href="/webhooks">GET: Webhooks</a>`)
)

app.use('/webhooks', webhooks)

app.use((req, res) => res.sendStatus(404))

https
  .createServer(
    {
      key: fs.readFileSync('./ssl_private.key'),
      cert: fs.readFileSync('./ssl.crt'),
    },
    app
  )
  .listen(cfg.port, () =>
    console.log('Server running at https://localhost:%s', cfg.port)
  )
