import axios from 'axios'
import data from './videoData.json' assert { type: 'json' }

//! Access Token from Graph API: หมดอายุภายในเวลา 1-2 ชั่วโมง

//TODO: User Meta from Graph API (Test)
async function getUserAPI() {
  const url = 'https://graph.facebook.com/v19.0/me'
  const params = {
    fields: 'id,name,email',
    access_token: import.meta.env.VITE_ACCESS_TOKEN,
  }
  try {
    const response = await axios.get(url, { params })
    console.log(response.data)
  } catch (err) {
    alert(err)
  }
}

async function getLiveVideoAPI() {
  let url = `http://graph.facebook.com/v19.0/me/live_videos?fields=id,title,status,permalink_url`
  // let url = `http://graph.facebook.com/v19.0/me/live_videos/?access_token=${data.accessToken}`

  return await axios
    .get(url)
    .then((res) => {
      const liveVideo = res.data.data[0] // /24493349380312689/videos/758082652421417
      console.log({ status: liveVideo.status, id: liveId })
      // LIVE, LIVE_STOPPED
      if (liveVideo.status === 'LIVE') {
        const video_url = liveVideo.permalink_url.split('/') // [ '', '24493349380312689', 'videos', '758082652421417' ]
        let liveId = video_url.length - 1
        console.log({ status: liveVideo.status, id: liveId })
      } else {
        console.log(liveVideo.status)
      }
    })
    .catch((e) => {
      console.log({ message: e.message })
    })
}

async function getCommentAPI() {
  const liveVideoID = data.liveId
  const params = {
    access_token: data.accessToken,
  }
  const url = `https://graph.facebook.com/v19.0/${liveVideoID}/comments`
  try {
    const response = await axios.get(url, { params })
    // console.log(response.data)
    return response.data.data
  } catch (err) {
    console.log('Failed to get comments from graph api --->', err)
  }
}

//TODO: บันทึกไฟล์ .csv ลูกค้าที่สั่งซื้อสินค้าตามรหัส code
/* 
  ตรวจสอบ comment ที่ขึ้นต้นด้วย "รหัสสินค้า" ที่กำหนดไว้ หากตรงกันจริง
  จะทำการเขียนข้อมูลลงในไฟล์ CSV ในรูปแบบของตาราง rows, columns
  และใช้ fs.appendFileSync() โดยเขียนข้อมูลเข้าไปแทรกในข้อมูลที่มีอยู่แล้วในไฟล์
*/
let code = 'ok'
const fileCSV = 'customer.csv'

function writeFileCSV(comment) {
  try {
    console.log(comment)
    if (
      String(comment.message).substring(0, code.length).toLowerCase() ==
      code.toLowerCase()
    ) {
      let row =
        comment.from.id +
        ',' +
        comment.from.name +
        ',' +
        comment.message +
        ',' +
        comment.created_time +
        '\n'
      fs.appendFileSync(fileCSV, row, 'utf8')
    }
  } catch (e) {
    console.log('Write file error --->', e)
  }
}

//* Main
async function getComment() {
  let firstRound = true
  let commentList = []

  setInterval(async () => {
    try {
      let newComment = await getCommentAPI()
      if (firstRound) {
        // console.log('Initial comment list')
        // console.log(newComment)
        fs.writeFileSync(fileCSV, '\ufeffComment_ID,Name,Code,Date\n', 'utf8')
        commentList = newComment
        commentList.forEach((comment) => {
          writeFileCSV(comment)
        })
        firstRound = false
      } else {
        commentList = await latestComment(commentList, newComment)
      }
    } catch (err) {
      console.log('Failed to get comments --->', err)
    }
  }, 10000)
}

getComment()
