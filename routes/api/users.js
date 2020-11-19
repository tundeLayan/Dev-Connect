const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

// Load User Module
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public 
router.get('/test', (req, res)=> res.json({msg: 'Users Works'}));

// @route   POST api/users/register
// @desc    Register User
// @access  Public 
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });


// @route   POST api/users/login
// @desc    Login User / Return JWT Token
// @access  Public 
router.post('/login', (req,res)=>{
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    const {email, password} = req.body;
    // Find User by email
    User.findOne({email: email})
    .then(user=>{
        // Check for user
        if(!user){
            errors.email = 'User not found';
            res.status(404).json(errors);
        }
        // Check password
        bcrypt.compare(password, user.password)
       
        .then(isMatch => {
            if(isMatch){
                // User Matched

                const payload = {id: user.id, name: user.name, avatar: user.avatar}

                // Sign Token
                jwt.sign(
                    payload, 
                    keys.secretOrKey, 
                    {expiresIn: (3600*24)}, 
                    (err, token)=>{
                        res.json({
                            payload,
                            success: true,
                            token: 'Bearer '+ token
                        })
                    })
            }else{
                errors.password = 'Password incorrect';
                return res.status(400).json(errors)
            }
        })
    });
})

// @route   GET api/users/current
// @desc    Return Current User
// @access  Private 
router.get('/current', passport.authenticate('jwt', {session: false}),
(req,res) => {
    // The token for the protected route is put into req.user
    const {_id,name, email} = req.user;
        res.json({_id, name, email});
    }
);

module.exports = router;