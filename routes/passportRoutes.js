const express = require('express');
const router = express.Router();

const User = require('../models/User');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const ensureLogin = require('connect-ensure-login');
const passport = require('passport');

router.get('/private', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('passport/private', {user: req.user});
})

  .get('/signup', (req, res, next)=>{
    res.render('passport/signup');
  })

  .post('/signup', (req, res, next)=>{
    User.register( new User({ username: req.body.username }),
    req.body.password,
    function(err, account){
      if(err){
        return res.json(err);
      }
      return res.redirect('/login')
    });
  })

  .get('/login', (req, res, next)=>{
    return res.render('passport/login');
  })

  .post('/login', passport.authenticate('local'), (req, res, next)=>{
    return res.redirect('/');
  })

  .get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/login');
  })

  .get("/private", (req, res, next)=>{
    const user = req.user;
  if(user){
    return res.render("private", {user});
  }
    return res.redirect("/login")
  });


module.exports = router;