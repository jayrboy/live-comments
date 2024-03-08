import mongoose from 'mongoose'

//* Connection
mongoose
  .connect('mongodb://localhost/db1')
  .then(() => {
    console.log('MongoDB Connected!')
  })
  .catch((e) => console.log({ message: e.message }))

//* Comment Model
const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // รหัสไอดีผู้ใช้ที่แสดงความคิดเห็น
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // รหัสสินค้าที่ความคิดเห็นเกี่ยวข้อง
  content: { type: String }, // เนื้อหาความคิดเห็น
  createdAt: { type: Date, default: Date.now }, // วันที่และเวลาที่ความคิดเห็นถูกสร้าง
})

export const Comment = mongoose.model('Comment', commentSchema)
