import { CommentModel } from '../models/comment.js'

const commentModel = new CommentModel()


export class CommentService {
  constructor() {
    this.commentModel = commentModel
  }

  async createComment(comment) {
    return this.commentModel.createComment(comment)
  }



}