import express from "express";
import User from "../schemas/user.js";

const router = express.Router();

/**
 * 회원가입
 */
router.post("/", async (req, res) => {
  const { nickname, password, checkPassword } = req.body;
  if (checkPassword !== password) { return res.status(401).send({ error: "Passwords do not match" }); }

  try{
    const user = new User({nickname:nickname, password:password});
    await user.save()
    res.status(200).send({success: true, user_id : user._id})
  }catch(err){
    if(err.code === 11000){
      return res.status(400).send({ success: false, errorMessage: 'User already exists' })
    }
    if (err.name === 'ValidationError') {
      console.error("ValidationError")
      return res.status(400).send({success: false, errorMessage: err.message})
    }
  }
})

export default router;