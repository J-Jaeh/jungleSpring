import express from 'express'
import Post from '../schemas/post.js'

let router = express.Router()


/**
 * 전체 게시글 조회
 * 1. 제목, 작성자명, 작성 날짜 조회
 * 2. 작성 날짜를 기준으로 내림차순
 */
router.get('/', async (req, res) => {

  const allPosts = await Post.find({}, { title: 1, author: 1, createdAt: 1 })
    .sort({ createdAt: -1 })
  // const result = allPosts.map(item => {
  //   // return {
  //   //   postId: item._id,
  //   //   title: item.title,
  //   //   createdAt: item.createdAt.toString,
  //   // }
  //   return res.status(200).json(result)
  // })

  return res.status(200).json({
    success: true,
    posts: allPosts,
  })
})


router.post('/', async (req, res) => {
  const { author, title, password, content } = req.body
  const post = new Post({ author: author, title: title, content: content, password: password })
  await post.save()

  return res.status(200).json({
    success: true,
    posts_id: post._id,
  })
})


export default router
