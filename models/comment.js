import mongoose from 'mongoose'


/**
 * 댓글
 * 내용 시간 소속 게시글
 */
const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    postId: { type: String, required: true },
    nickname: { type: String, required: true },
  },
  { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

export class CommentModel {

  async createComment(comment) {
    const createdComment = new Comment(comment)
    return createdComment.save()
  }

  async getComments(postId) {
    return Comment.find({ postId: postId }, { content: 1, createdAt: 1 })
      .sort({ createdAt: -1 })
      .exec()
  }

  async editComment(id, req, nickname) {
    return Comment.findOneAndUpdate({ _id: id, nickname: nickname }, req, { new: true })
  }

  async deleteComment(id,nickname) {
    return Comment.findOneAndDelete({ _id: id ,nickname:nickname}).exec()
  }

  async deleteRelatedComments(postId){
    return  Comment.deleteMany({ postId:postId }).exec()

  }
}