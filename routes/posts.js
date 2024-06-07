import express from 'express'
import Post from '../schemas/post.js'

let router = express.Router()


/**
 * 전체 게시글 조회
 * 1. 제목, 작성자명, 작성 날짜 조회
 * 2. 작성 날짜를 기준으로 내림차순
 */
router.get('/', async (req, res) => {

  const allPosts = await Post.find({}, { title: 1, nickname: 1, createdAt: 1 ,_id:0})
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
 * 글 수정
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const findPost = await Post.findById({ _id: id }).exec()

  if (!findPost) return res.status(404).json({ success: false, errorMessage: 'Post not found' })


  const { title, content, reqPassword } = req.body

  if (reqPassword !== findPost.password) return res.status(401).json({
    success: false,
    errorMessage: 'Password not match',
  })

  if (title) {
    findPost.title = title
  }
  if (content) {
    findPost.content = content
  }
  await findPost.save()

  return res.status(200).json({ success: true, posts_id: findPost._id })
})


/**
 * 글 삭제
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { reqPassword } = req.body
  if (!reqPassword) {
    return res.status(400).json({ success: false, errorMessage: 'Password not match' })
  }

  const { password } = await Post.findById({ _id: id }).exec()

  if (!password) return res.status(400).json({ success: false, errorMessage: 'Post not found' })

  if (password === reqPassword) {
    await post.deleteOne({ _id: id }).exec()
    return res.status(200).json({ success: true })
  }
  return res.status(400).json({ success: false, errorMessage: 'Password does not match' })
})


export default router
