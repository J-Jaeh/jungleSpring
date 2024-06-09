import express from 'express'

import Comment from '../models/comment.js'
import authMiddleware from '../middleware/auth-middleware.js'
import { PostService } from '../services/postService.js'


let router = express.Router()

const postService = new PostService()


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
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const findPost = await postService.getPost(id)

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

  const nickname = res.locals.nickname
  const { id } = req.params
  const request = req.body

  const editPost = await postService.editPost(id, request, nickname)
  if (!editPost) {
    return res.status(404).send({success: false, errorMessage: 'Unauthorized'})
  }
  return res.status(200).json({ success: true, posts_id: editPost._id })
}])


/**
 * 글 삭제
 */
router.delete('/:id', [authMiddleware, async (req, res) => {
  const { id } = req.params
  const nickname = res.locals.nickname

  const deletePost = await postService.deletePost(id,nickname)
  if (!deletePost) {
    return res.status(404).send({success: false, errorMessage: 'Unauthorized'})
  }
  //연관된 댓글도 삭제해야함.
  // const commentIds = await Comment.find({ postId: id }, { _id: 1 }).exec()
  // // console.log(commentIds)
  // await Comment.deleteMany({ _id: { $in: commentIds } }).exec()

  return res.status(200).json({ success: true })
}])


export default router
