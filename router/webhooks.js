import express from 'express'
import crypto from 'crypto'

const router = express.Router()

const VERIFY_TOKEN = 'livecomments001' // กำหนด secret key (ตั้งขึ้นเอง) สำหรับการตรวจสอบให้ Facebook ทดสอบว่าแอปมีอยู่จริง
let contents = []

router.get('/', (req, res) => {
  try {
    const mode = req.query['hub.mode']
    const challenge = req.query['hub.challenge']
    const verifyToken = req.query['hub.verify_token']

    if (mode && verifyToken === VERIFY_TOKEN) {
      console.log({ message: 'WEBHOOK_VERIFIED_SUCCESSFULLY' })
      res.status(200).send(challenge)
    } else {
      console.log({ message: 'WEBHOOK_TOKENS_DO_NOT_TRY_TO_MATCH' })
      res.sendStatus(400)
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

router.post('/', (req, res) => {
  try {
    const payload = req.body

    console.log(payload)

    contents.unshift(payload)

    res.sendStatus(200)
  } catch (err) {
    console.log({ message: err.message })
    res.status(500)
  }
})

export default router
