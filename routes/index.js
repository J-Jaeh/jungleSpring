import express from 'express'
import postRouter from './posts.js'
import commentRouter from './comments.js'


const router = express.Router()


router.get('/', (req, res) => {
  res.status(200).send('Welcome')
})

router.use('/posts', postRouter)
router.use('/comments', commentRouter)


export default router
