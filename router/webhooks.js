import express from 'express'
import {
  getUser,
  getComment,
  getWebhook,
} from '../modules/facebook/facebook.js'

const router = express.Router()

// กำหนด secret key สำหรับการตรวจสอบ signature
const webhookSecret = 'your_webhook_secret'

router.get('/webhooks', async (req, res) => {
  try {
    // let result = await getWebhook()
    // console.log(result) //? check result
  } catch (e) {}
})

router.post('/webhooks', async (req, res) => {
  try {
    const signature = req.get('X-Hub-Signature-256')
    const body = JSON.stringify(req.body)

    // ตรวจสอบ signature
    const hash = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    if (signature === `sha256=${hash}`) {
      // Signature ถูกต้อง, ดำเนินการต่อไป
      res.status(200).send('Webhook received Successfully.')
      console.log('Webhook received:', req.body)
    } else {
      // Signature ไม่ถูกต้อง, ไม่ดำเนินการต่อ
      res.status(401)
      console.log('Invalid signature')
    }
  } catch (e) {}
})

export default router
