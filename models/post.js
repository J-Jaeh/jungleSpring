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

  /**
   *게시글 생성
   */
  async creatPost(post) {
    const createdPost = new Post(post)
    return await createdPost.save()
  }

}


