import express from 'express'
import webhooks from './router/webhooks.js'

const app = express()
const port = 8000

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

app.listen(port, () =>
  console.log('Express running at http://localhost:%s', port)
)
