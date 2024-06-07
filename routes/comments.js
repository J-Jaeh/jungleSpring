import express from 'express';
import Comment from '../schemas/comment.js';
import Post from '../schemas/post.js';


const router = express.Router();

/**
 * 댓글 조회
 */
router.get('/:postId', async (req, res) => {
  const {postId} = req.params;
  const findPostId = await Post.findById({_id:postId},{_id:1}).exec()

  if(!findPostId) return res.status(400).json({success:false,errorMessage:'Post not found'});

  const findComments = await Comment.find({postId: postId},{content:1,createdAt:1})
    .sort({ createdAt: -1 })
    .exec()
  return res.status(200).json({success: true, findComments: findComments})
})



/**
 * 댓글작성
 */
router.post('/:postId', async (req, res) => {
  const { content } = req.body;
  const { postId } =req.params;
  if(!content) return res.status(400).json({success: false,errorMessage: '댓글 내용을 입력해주세요'});

  const findPostId = await Post.findById({_id:postId},{_id:1}).exec()

  if(!findPostId) return res.status(400).json({success:false,errorMessage:'Post not found'});

  const comment = new Comment({content:content,postId:postId})

  await comment.save()

  return res.status(200).json({success: true,comment_id : comment._id})
})






export default router;

