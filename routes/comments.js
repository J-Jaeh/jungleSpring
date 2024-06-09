import express from 'express'
import mongoose from 'mongoose'
import { CommentService } from '../services/commentServices.js'
import { PostService } from '../services/postService.js'
import { checkCommentId, checkPostId } from '../middleware/check-objectId-middleware.js'
import authMiddleware from '../middleware/auth-middleware.js'

const commentService = new CommentService()
const postService = new PostService()

const router = express.Router()

/**
 * 댓글 조회
 */
router.get('/:postId', [checkPostId, async (req, res) => {
  const { postId } = req.params
  try {
    await postService.getPost(postId)
    const findComments = await commentService.getComments(postId)
    return res.status(200).json({ success: true, findComments: findComments })
  } catch (err) {
    return res.status(400).json({ success: false, errorMessage: 'Post not found' })
  }
}])


/**
 * 댓글작성
 */
router.post('/:postId', [authMiddleware, checkPostId, async (req, res) => {
  const { content } = req.body
  const { postId } = req.params
  const nickname = res.locals.nickname

  if (!content) return res.status(400).json({ success: false, errorMessage: '댓글 내용을 입력해주세요' })

  try {
    await postService.getPost(postId)
    const creatComment = await commentService.createComment({
      postId: postId,
      nickname: nickname,
      content: content,
    })

    return res.status(200).json({ success: true, comment_id: creatComment._id })

  } catch (err) {
    return res.status(400).json({ success: false, errorMessage: 'Post not found' })
  }
}])


/**
 * 댓글 수정
 */
router.patch('/:commentId', [authMiddleware, checkCommentId, async (req, res) => {
  const { commentId } = req.params
  const { reqContent } = req.body
  const nickname = res.locals.nickname

  if (!reqContent) return res.status(400).json({ success: false, errorMessage: '댓글 내용을 입력해주세요' })
  try {
    await commentService.editComment(commentId, reqContent, nickname)
    return res.status(200).json({ success: true, comment_id: commentId })
  } catch (err) {
    return res.status(403).json({ success: false, errorMessage: 'Unauthorized' })
  }
}])


/**
 * 댓글 삭제
 */
router.delete('/:commentId', [authMiddleware, checkCommentId, async (req, res) => {
  const { commentId } = req.params
  const nickname = res.locals.nickname

  // commentId가 유효한 ObjectId 형태인지 확인
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ success: false, errorMessage: 'Invalid comment ID' })
  }

  const findComment = await Comment.findOne({ _id: commentId, nickname: nickname }).exec()

  if (!findComment) return res.status(400).json({ success: false, errorMessage: 'Unauthorized' })

  await findComment.deleteOne({ _id: commentId }).exec()

  return res.status(200).json({ success: true })
}])


export default router

