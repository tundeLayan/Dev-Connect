const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Profile validation file
const validateProfileInput = require('../../validations/profile');
const validateExperienceInput = require('../../validations/experience');
const validateEducationInput = require('../../validations/education');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public 
router.get('/test', (req, res)=> res.json({msg: 'Profile Works'}));

// @route   GET api/profile/
// @desc    Get current user's profile
// @access  Private 
router.get('/', passport.authenticate('jwt', {session: false}), (req,res)=> {
    const errors = {};

    Profile.findOne({ user: req.user.id })
    // populate with user and avatar from the user db
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user.'
            return res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch(err => (
        res.status(404).json(err)
    ))

});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public 
router.get('/all', (req,res)=>{
    const errors = {};
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then((profiles) => {
        errors.noprofile = "There are no profiles";
        if(!profiles){
            return res.status(404).json(errors);
        }

         res.json(profiles);
    })
    .catch(err => {
        res.status(404).json({profile: "There are no profiles"});
    })
})


// @route   GET api/profile/handle/:handle 
// @desc    Get profile by handle
// @access  Public 
router.get('/handle/:handle', (req, res)=>{
    const errors = {}; 
    Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);

        }
        res.json(profile);

    })
    .catch( err => res.status(404).json(err))
});

// @route   GET api/profile/user/:user_od
// @desc    Get profile by user ID
// @access  Public 
router.get('/user/:user_id', (req, res)=>{
    const errors = {}; 
    Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
            console.log(errors.noprofile);
        }
        res.json(profile);
    })
    .catch( err => res.status(404).json({ profile: 'There is no profile from this user' }))
});

// @route   POST api/profile/
// @desc    Create or edit User Profile
// @access  Private 
router.post('/', passport.authenticate('jwt', {session: false}), (req,res)=> {
    const {isValid, errors} = validateProfileInput(req.body);
    console.log(isValid)
    // Check validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) {profileFields.handle = req.body.handle};
    if(req.body.company) {profileFields.company = req.body.company};
    if(req.body.website) {profileFields.website = req.body.website};
    if(req.body.location) {profileFields.location = req.body.location};
    if(req.body.bio) {profileFields.bio = req.body.bio};
    if(req.body.status) {profileFields.status = req.body.status};
    if(req.body.githubusername) {profileFields.githubusername = req.body.githubusername};
    // Skills - Split into an array
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }
    // Social
    profileFields.social = {};
    if(req.body.youtube) {
        profileFields.social.youtube = req.body.youtube;
    };
    if(req.body.twitter) {
        profileFields.social.twitter = req.body.twitter;
    };
    if(req.body.facebook) {
        profileFields.social.facebook = req.body.facebook
    };
    if(req.body.linkedin) {
        profileFields.social.linkedin = req.body.linkedin
    };
    if(req.body.instagram) {
        profileFields.social.instagram = req.body.instagram
    };

    Profile.findOne({user: req.user.id})
        .then(profile=>{ 
            if(profile){
                // Update
                Profile.findOneAndUpdate(
                    {user: req.user.id}, 
                    {$set: profileFields},
                    {new: true}
                ).then(profile => res.json(profile))
            }else{
                // Create
                
                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle})
                .then(profile => {
                    if(profile){
                        errors.handle = 'This handle already exists';
                        res.status(400).json(errors);
                    }

                    // Save Profile
                    new Profile(profileFields).save()
                    .then(profile => res.json(profile));
                })
            }
        })
   
});

// @route   POST api/profile/experience
// @desc    Add Experience to the profile
// @access  Private 
router.post('/experience',passport.authenticate('jwt',{session: false }) ,(req,res)=>{
    console.log(req.body);
    const {isValid, errors} = validateExperienceInput(req.body);
    console.log(isValid)
    // Check validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then((profile)=>{
          const newExp = { 
              title: req.body.title,
              company: req.body.company,
              location: req.body.location,
              from: req.body.from,
              to: req.body.to,
              current: req.body.current,
              description: req.body.description
          }

        //   Add to exp array
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile))
      }) 
});

// @route   POST api/profile/education
// @desc    Add Education to the profile
// @access  Private 
router.post('/education',passport.authenticate('jwt',{session: false }) ,(req,res)=>{
    const {isValid, errors} = validateEducationInput(req.body);
    console.log(isValid)
    // Check validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then((profile)=>{
          const newEdu = { 
              school: req.body.school,
              degree: req.body.degree,
              fieldofstudy: req.body.fieldofstudy,
              from: req.body.from,
              to: req.body.to,
              current: req.body.current,
              description: req.body.description
          }

        //   Add to exp array
        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile))
      }) 
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete Experience from the profile
// @access  Private 
router.delete('/experience/:exp_id',passport.authenticate('jwt',{session: false }) ,(req,res)=>{
    Profile.findOne({ user: req.user.id })
    .then((profile)=>{
    //    Get remove index
    const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);


        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
    }) 
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete Education from the profile
// @access  Private 
router.delete('/education/:edu_id',passport.authenticate('jwt',{session: false }) ,(req,res)=>{
    Profile.findOne({ user: req.user.id })
    .then((profile)=>{
    //    Get remove index
    const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
    }) 
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/',passport.authenticate('jwt',{session: false }) ,(req,res)=>{
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
             User.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: true }))
        })
}) 

module.exports = router;