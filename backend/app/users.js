const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const auth = require('../middleware/auth');
const config = require('../config');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath + '/avatars')
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {
  try{
    const userData = {
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
    };

    if(req.file){
      userData.avatar = req.file.filename;
    }

    const user = new User(userData);

    user.generateToken();
    await user.save();

    return res.send(user);
  }catch(error){
    res.status(500).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  try{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username});
    if(!user) return res.status(401).send({error: 'User not found'});

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(401).send({error: 'Invalid password'});

    user.generateToken();
    await user.save();

    return res.send(user);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.post('/subscribe', auth, async (req, res) => {
  try{
    const user = req.user;
    const subscribeTo = await User.findOne({displayName: req.body.displayName});

    if(!subscribeTo) return res.status(400).send({message: 'User not found'});

    user.subscription.push(subscribeTo._id);

    await user.save();

    return res.send(user);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.patch('/edit', [auth, upload.single('avatar')], async (req, res) => {
  try{
    const user = req.user;
    const newData = req.body;

    const isMatch = await user.comparePassword(newData.oldPassword);

    if(newData.newPassword && isMatch){
      user.password = newData.newPassword;
    }
    if(newData.displayName){
      user.displayName = newData.displayName;
    }
    if(req.file){
      user.avatar = req.file.filename;
    }

    await user.save();

    res.send(user);
  }catch(error){
    res.status(500).send(error);
  }
});

router.delete('/sessions', async (req, res) => {
  const success = {message: 'Success'};

  try{
    const token = req.get('Authorization').split(' ')[1];
    if(!token) return res.send(success);

    const user = await User.findOne({token});
    if(!user) return res.send(success);

    user.generateToken();
    await user.save();

    res.send(user);
  }catch(error){
    return res.send(success);
  }
});

module.exports = router;