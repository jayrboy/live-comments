import axios from 'axios'
import data from './videoData.json' assert { type: 'json' }

//! Access Token from Graph API: หมดอายุภายในเวลา 1-2 ชั่วโมง

const params = {
  access_token: data.accessToken,
}

export function getUser() {
  // let url = `https://graph.facebook.com/v19.0/me?fields=id,name,email,picture&access_token=${data.accessToken}`
  let url = `https://graph.facebook.com/v19.0/me?fields=id,name,email`
  return axios(url, {
    method: 'get',
    params: params,
  })
    .then((result) => result.data)
    .catch((e) => console.log({ message: e.message }))
}

export function getComment() {
  let url = `https://graph.facebook.com/v19.0/me/comments?access_token=${data.accessToken}` // { data: [] }
  return axios
    .get(url)
    .then((result) => result.data)
    .catch((e) => console.log({ message: e.message }))
}

export function getLiveVideo() {
  let url = `http://graph.facebook.com/v19.0/me/live_videos?fields=id,title,status,permalink_url`
  // let url = `http://graph.facebook.com/v19.0/me/live_videos/?access_token=${data.accessToken}`

  return axios
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

export function getLiveId() {
  let url = `http://streaming-graph.facebook.com/v18.0/${liveId}/live_comments`
  return axios
    .get(url, {
      params: params,
    })
    .then((result) => {
      if (result && !result.error) {
        console.log(result.data)
      }
    })
    .catch((e) => res.status(500).send({ message: e.message }))
}

//* Main
async function main() {
  let result = await getComment() //TODO:
  console.log(result)
}

//* Use Main and Exception

try {
  main()
} catch (error) {
  console.log({ message: error.message })
}
