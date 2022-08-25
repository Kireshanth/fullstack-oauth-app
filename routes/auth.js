const express = require('express');
const passport = require('passport');
const router = express.Router();

// auth with google
// get /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))


// Google auth callback
// Get  /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect:
     '/'}), (req, res) => {
        res.redirect('/dashboard')
     }
)

// Logout user
// @route /auth/logout

router.get('/logout', (req, user) =>{
    req.logout(function(err){
        if (err) { return next(err)}
        res.redirect('/')
    })
})



module.exports = router;