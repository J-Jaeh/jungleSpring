import { PostModel } from '../models/post.js'
import res from 'express/lib/response.js'


const postModel = new PostModel()

export class PostService {

  constructor() {
    this.postModel = postModel
  }

  async getPost(id) {
    const creatPost = await this.postModel.getPost(id)
    if (!creatPost) return new Error('Post not found')
    return creatPost
  }

  async getAllPost() {
    return this.postModel.getAllPost()
  }

  async createPost(post) {
    return this.postModel.createPost(post)
  }

  async editPost(id, req, reqNickname) {
    return this.postModel.editPost(id, req, reqNickname)
  }

  async deletePost(id, reqNickname) {
    return this.postModel.deletePost(id, reqNickname)
  }

}