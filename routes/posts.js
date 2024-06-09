import express from 'express'

import authMiddleware from '../middleware/auth-middleware.js'
import { checkPostId } from '../middleware/check-objectId-middleware.js'
import { PostService } from '../services/postService.js'
import { CommentService } from '../services/commentService.js'


let router = express.Router()

const postService = new PostService()
const commentService = new CommentService()

/**
 * 전체 게시글 조회
 * 1. 제목, 작성자명, 작성 날짜 조회
 * 2. 작성 날짜를 기준으로 내림차순cc
 */
router.get('/', async (req, res) => {

  const allPosts = await postService.getAllPost()

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
  const nickname = res.locals.nickname
  console.log(nickname)

  const post = await postService.createPost({ nickname: nickname, title: title, content: content })

  return res.status(200).json({
    success: true,
    posts_id: post._id,
  })
}])

/**
 * 글 조회
 */
router.get('/:postId', [checkPostId,async (req, res) => {
  const { postId } = req.params
  try {
    const findPost = await postService.getPost(postId)
    return res.status(200).json({ success: true, posts: findPost})
  } catch (err) {
    return res.status(404).json({ success: false, errorMessage: err.message })
  }
}])

/**
 * 글 수정
 */
router.patch('/:postId', [authMiddleware,checkPostId, async (req, res) => {

  const nickname = res.locals.nickname
  const { postId } = req.params
  const request = req.body

  const editPost = await postService.editPost(postId, request, nickname)
  if (!editPost) {
    return res.status(404).send({ success: false, errorMessage: 'Unauthorized' })
  }
  return res.status(200).json({ success: true, posts_id: editPost._id })
}])


/**
 * 글 삭제
 */
router.delete('/:postId', [authMiddleware,checkPostId ,async (req, res) => {
  const { postId } = req.params
  const nickname = res.locals.nickname

  const deletePost = await postService.deletePost(postId, nickname)
  if (!deletePost) {
    return res.status(404).send({ success: false, errorMessage: 'Unauthorized' })
  }
  await commentService.deleteRelatedComments(postId)

  return res.status(200).json({ success: true })
}])


export default router
