import mongoose from 'mongoose'


/**
 * 댓글
 * 내용 시간 소속 게시글
 */
const commentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  postId: {type: String, required: true},
  },
  { timestamps: true })

export default mongoose.model('Comment', commentSchema)