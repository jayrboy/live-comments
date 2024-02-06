import express from 'express'
import https from 'https'
import fs from 'fs'

const app = express()
const port = 3000

const certificate = {
  key: fs.readFileSync('./config/ssl_private.key', 'utf-8'),
  cert: fs.readFileSync('./config/ssl.crt', 'utf-8'),
}

const server = https.createServer(certificate, app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))

app.get('/', (req, res) => res.send('<a href="/webhooks">GET: Webhooks</a>'))

server.listen(port, () =>
  console.log('Server running at https://localhost:%s', server.address().port)
)
