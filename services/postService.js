import { PostModel } from '../models/post.js'


const postModel = new PostModel()

export class PostService {

  constructor() {
    this.postModel = postModel
  }

  async getPost(id) {
    return this.postModel.getPost(id)
  }

  async getAllPost() {
    return this.postModel.getAllPost()
  }

  async createPost(post) {
    return this.postModel.createPost(post)
  }

  async editPost(id,req,reqNickname) {
    return this.postModel.editPost(id,req,reqNickname)
  }

}