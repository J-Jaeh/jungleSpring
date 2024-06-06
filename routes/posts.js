import express from 'express'
import Post from '../schemas/post.js'
import post from '../schemas/post.js'

let router = express.Router()


/**
 * 전체 게시글 조회
 * 1. 제목, 작성자명, 작성 날짜 조회
 * 2. 작성 날짜를 기준으로 내림차순
 */
router.get('/', async (req, res) => {

  const allPosts = await Post.find({}, { title: 1, author: 1, createdAt: 1 })
    .sort({ createdAt: -1 })

  return res.status(200).json({
    success: true,
    posts: allPosts,
  })
})


/**
 * 글 생성
 */
router.post('/', async (req, res) => {
  const { author, title, password, content } = req.body
  const post = new Post({ author: author, title: title, content: content, password: password })
  await post.save()

  return res.status(200).json({
    success: true,
    posts_id: post._id,
  })
})

/**
 * 글 조회
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const findPost = await Post.findById({ _id: id }, { title: 1, author: 1, createdAt: 1, content: 1 }).exec()

  if (!findPost) return res.status(404).json({ success: false, errorMessage: 'Post not found' })

  return res.status(200).json({
    success: true,
    posts_id: findPost,
  })
})

/**
 * 글 삭제
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { password } = req.body
  if (!password) {
    return res.status(400).json({ success: false, errorMessage: 'Password not match' })
  }

  const findPost = await Post.findById({ _id: id }, { password: 1 }).exec()

  if (!findPost) return res.status(400).json({ success: false, errorMessage: 'Post not found' })

  if (password === findPost.password) {
    await post.deleteOne({ _id: id }).exec()
    return res.status(200).json({ success: true })
  }
  return res.status(400).json({ success: false, errorMessage: 'Password does not match' })
})


export default router
