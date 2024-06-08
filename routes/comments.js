import express from 'express'
import mongoose from 'mongoose'
import Comment from '../schemas/comment.js'
import Post from '../schemas/post.js'
import authMiddleware from '../middleware/auth-middleware.js'



const router = express.Router()

/**
 * 댓글 조회
 */
router.get('/:postId', async (req, res) => {
  const { postId } = req.params

  // commentId가 유효한 ObjectId 형태인지 확인
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ success: false, errorMessage: 'Invalid post ID' })
  }

  const findPostId = await Post.findById({ _id: postId }, { _id: 1 }).exec()

  if (!findPostId) return res.status(400).json({ success: false, errorMessage: 'Post not found' })

  const findComments = await Comment.find({ postId: postId }, { content: 1, createdAt: 1 })
    .sort({ createdAt: -1 })
    .exec()
  return res.status(200).json({ success: true, findComments: findComments })
})


/**
 * 댓글작성
 */
router.post('/:postId',[authMiddleware,async (req, res) => {
  const { content } = req.body
  const { postId } = req.params
  const nickname=res.locals.nickname
  // postId가 유효한 ObjectId 형태인지 확인
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ success: false, errorMessage: 'Invalid post ID' })
  }

  if (!content) return res.status(400).json({ success: false, errorMessage: '댓글 내용을 입력해주세요' })

  const findPostId = await Post.findById({ _id: postId }, { _id: 1 }).exec()

  if (!findPostId) return res.status(400).json({ success: false, errorMessage: 'Post not found' })

  const comment = new Comment({ content: content, postId: postId,nickname: nickname })

  await comment.save()

  return res.status(200).json({ success: true, comment_id: comment._id })
}])


/**
 * 댓글 수정
 */
router.patch('/:commentId',[authMiddleware, async (req, res) => {
  const { commentId } = req.params
  const { reqContent } = req.body
  const nickname=res.locals.nickname
  // commentId가 유효한 ObjectId 형태인지 확인
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ success: false, errorMessage: 'Invalid comment ID' })
  }

  if (!reqContent) return res.status(400).json({ success: false, errorMessage: '댓글 내용을 입력해주세요' })

  const findComment = await Comment.findOne({ _id: commentId,nickname:nickname }).exec()

  if(!findComment) return res.status(404).json({ success: false, errorMessage: 'Unauthorized' })

  findComment.content = reqContent

  await findComment.save()
  return res.status(200).json({ success: true, comment_id: commentId })
}])


/**
 * 댓글 삭제
 */
router.delete('/:commentId', [authMiddleware,async (req, res) => {
  const { commentId } = req.params
  const nickname =res.locals.nickname

  // commentId가 유효한 ObjectId 형태인지 확인
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ success: false, errorMessage: 'Invalid comment ID' })
  }

  const findComment = await Comment.findOne({ _id: commentId, nickname:nickname }).exec()

  if(!findComment) return res.status(400).json({ success: false, errorMessage: 'Unauthorized' })

  await findComment.deleteOne({ _id: commentId }).exec()

  return res.status(200).json({ success: true})
}])



export default router

