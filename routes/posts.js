import express from 'express'
import Post from '../schemas/post.js'
import User from '../schemas/user.js'
import Comment from '../schemas/comment.js'
import authMiddleware from '../middleware/auth-middleware.js'

let router = express.Router()


/**
 * 전체 게시글 조회
 * 1. 제목, 작성자명, 작성 날짜 조회
 * 2. 작성 날짜를 기준으로 내림차순cc
 */
router.get('/', async (req, res) => {

  const allPosts = await Post.find({}, { title: 1, nickname: 1, createdAt: 1, _id: 0 })
    .sort({ createdAt: -1 })

  return res.status(200).json({
    success: true,
    posts: allPosts,
  })
})

/**
 * 글 생성
 */
router.post('/create', [authMiddleware, async (req, res) => {
  const { title, content } = req.body
  const nickname =res.locals.nickname
  console.log(nickname)
  const post = new Post({ nickname: nickname, title: title, content: content })
  await post.save()

  return res.status(200).json({
    success: true,
    posts_id: post._id,
  })
}])

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
router.patch('/:id', [authMiddleware, async (req, res) => {
  // await isCheck(req,res)
    // return res.status(401).json({ success: false, errorMessage: 'Unauthorized' })
  //
  const nickname =res.locals.nickname
  const { id } = req.params
  const findPost = await Post.findOne({ _id: id,nickname: nickname }).exec()

  if (!findPost) return res.status(404).json({ success: false, errorMessage: 'Unauthorized' })

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
}])


/**
 * 글 삭제
 */
router.delete('/:id', [authMiddleware, async (req, res) => {
  const { id } = req.params
  const nickname =res.locals.nickname
  //인증은 되었지만 실제 작성자인지 확인하는게 필요함
  const findPost = await Post.findOne({ _id: id, nickname:nickname }).exec()

  if(!findPost) return res.status(404).json({ success: false, errorMessage: 'Unauthorized' })

  //연관된 댓글도 삭제해야함.
  const commentIds= await Comment.find({postId:id},{_id:1}).exec()
  // console.log(commentIds)
  await Comment.deleteMany({_id:{$in: commentIds}}).exec();

  await findPost.deleteOne({ _id: id }).exec()
  return res.status(200).json({ success: true })
}])



export default router
