import { CommentModel } from '../models/comment.js'

const commentModel = new CommentModel()


export class CommentService {
  constructor() {
    this.commentModel = commentModel
  }

  async createComment(comment) {
    return this.commentModel.createComment(comment)
  }

  async getComments(postId) {
    return this.commentModel.getComments(postId)
  }

  async editComment(id, req, reqNickname) {
    const editComment = this.commentModel.editComment(id, req, reqNickname)
    if (!editComment) {
      return new Error('Unauthorized')
    }

    return editComment
  }

}