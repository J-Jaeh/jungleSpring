import mongoose from 'mongoose'



export const checkPostId = (req, res, next) => {
  const { postId }=req.params
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ success: false, errorMessage: 'Invalid post ID' })
  }
  next()
}

export const checkCommentId = (req, res, next) => {
  const { commentId }=req.params
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ success: false, errorMessage: 'Invalid post ID' })
  }
  next()
}