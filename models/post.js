import mongoose from 'mongoose'

/**
 * 제목. 작성자명, 작성날짜 들어가야함
 * 작성내용. 비밀번호
 */
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    nickname: { type: String, required: true },
  },
  { timestamps: true })

const Post = mongoose.model('Post', postSchema)


export class PostModel {

  //생성
  async createPost(post) {
    const createdPost = new Post(post)
    return createdPost.save()
  }

  //전체 게시글 조회
  async getAllPost() {
    return Post.find({}, { title: 1, nickname: 1, createdAt: 1, _id: 0 }).sort({ createdAt: -1 }).exec()
  }

  //단일 게시글 조회
  async getPost(id) {
    return Post.findById({ _id: id }, { title: 1, author: 1, createdAt: 1, content: 1 }).exec()
  }

  //글 수정
  async editPost(id, req, nickname) {
    return Post.findOneAndUpdate({ _id: id, nickname: nickname }, req, { new: true })
  }

  //삭제
  async deletePost(id, nickname) {
    return Post.findOneAndDelete({ _id: id, nickname: nickname }).exec()
  }

}


