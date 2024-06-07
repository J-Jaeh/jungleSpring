import mongoose from 'mongoose'


/**
 * 댓글
 * 내용 시간
 */
const commentSchema = new mongoose.Schema({
  content: {type: String, required: true}, },
  { timestamps: true })

export default mongoose.model('Comment', commentSchema)