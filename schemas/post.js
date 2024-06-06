import mongoose from 'mongoose'


/**
 * 제목. 작성자명, 작성날짜 들어가야함
 * 작성내용. 비밀번호
 */
const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  },
)

postSchema.virtual('postId').get(function() {
  return this._id.toHexString()
})

postSchema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model('Post', postSchema)