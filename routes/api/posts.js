const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validations/post');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res)=> res.json({msg: 'Posts Works'}));

// @route   GET api/posts
// @desc    Get Post
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({noPostsfound: 'No post found(/)'}));
});

// @route   GET api/posts/:id
// @desc    Get Post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({noPostfound: 'No post found with that id'}));
});

// @route   POST api/posts
// @desc    Create Post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  // Check Validation
  if(!isValid){
    // If any errors, senf 400 with errors object
    return res.status(400).json(errors);
  }
  const {text, name, avatar } = req.body; 
  const newPost = new Post({
    text,
    name,
    avatar,
    user: req.user.id
  });
  newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete Post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Get the profile of the person logged in
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get the post we want to delete by ID
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if(post.user.toString() !== req.user.id) {
            console.log("I got here")
            return res.status(401).json({ notAuthorized: 'User not authorized' })
          }
          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found(delete /:id)'}));
    })
});

// @route   POST api/posts/like/:id
// @desc    Like Post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyLiked: 'User already liked this post' });
          }
          console.log(req.user.id)
          // Todo: Prevent User from liking own video
          // if(req.user.id === post.user.toString()){
          //   return res.status(400).json({ cantLikeOwnPost: 'User can\'t like own post' });
          // }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found(post /like/:id)'}));
    })
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike Post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notLiked: 'You have not yet liked this post' });
          }
          // Get remove index
          const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then((post) => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found(post /unlike/:id)'}));
    })
});

// @route   POST api/posts/comment/:id
// @desc    Add comments to Post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if(!isValid){
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  
  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      // Add to comments array
      post.comments.unshift(newComment);

      // Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found here' }))
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comments from Post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {  
  Post.findById(req.params.id)
    .then(post => {
      // Check if the comment exists
      if(
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id).length === 0 ) {
        return res.status(404).json({ commentnotexists: "Comment does not exist" });
      }
      // Get remove index
      const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id); 

      // Splice comment out of the array
      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
});

module.exports = router;