var passport = require('passport');
var User = require('../model/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {});
  })
  .post(function(req, res, next) {
    User.register(new User({username: req.body.username,email: req.body.email,fname: req.body.fname,lname: req.body.lname}), req.body.password, function(err, account) {
      if(err) {
        //return res.render('register', {account: account});
        return res.send("Somethings wrong with your Username or Email. Username must be 8-15 characters and you must use appropriate email address.");
      }

      req.login(account, function(err) {
        res.redirect('/');
      });
    })
  })

router.get('/login', function(req, res, next) {
  if(req.user){
    res.redirect('/');
  }
  else{
    res.render('login', {user: req.user});
  }
});


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/blobs');
  });

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;