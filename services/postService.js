export class PostService {
  constructor(postModel) {
    this.postModel = postModel
  }

  async getPost() {
    return this.postModel.getPost()
  }

  async getAllPost() {
    return this.postModel.getAllPost()
  }

  async createPost(post) {
    //비지니스 로직이 들어가면 됨 .!
    return this.postModel.createPost(post)
  }

}