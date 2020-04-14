const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath + '/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

const router = express.Router();

router.post('/', [auth, upload.single('image')], async (req, res) => {
  try{
    const postData = {
      user: req.user._id,
      text: req.body.text,
      tags: JSON.parse(req.body.tags),
  };

    if(req.file){
      postData.image = req.file.filename;
    }

    const post = new Post(postData);

    await post.save();

    return res.send(post);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.get('/', auth, async (req, res) => {
  try{
    let subscriptions = [req.user._id];

    if(req.user.subscription.length > 0){
      subscriptions = subscriptions.concat(req.user.subscription);
    }

    const posts = await Post.find({user: {$in: subscriptions}}).populate('user').sort({date: -1});

    return res.send(posts);
  }catch(error){
    return res.status(500).send(error);
  }
});

module.exports = router;