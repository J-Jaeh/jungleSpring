import express from 'express';
import postRouter from './posts.js';


const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send('Welcome');
})

router.use("/posts",postRouter);





export default router;
