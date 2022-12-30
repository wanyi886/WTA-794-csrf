var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const { generateKey, setTokenCookie } = require('../utils/utils') ;
const { users } = require('../utils/fakedata')

var csrfProtection = csrf( { cookie: true } );



// Completed: get login form

router.get('/', csrfProtection, function(req, res, next) {
  res.render('loginForm', { csrfToken: req.csrfToken()});
});


// TODO: post route for login 
router.post('/session', csrfProtection, function(req, res, next){
  
  const { username, password } = req.body;

  const user = users.find( user => user.username === username && user.password === password)

  if (user) {
    
    res.cookie("session_id", generateKey())
    // setTokenCookie(res, user)

    res.redirect('/WTA-794/loggedIn')

  } else {
    // TODO: error handler
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.message = 'The provided credentials were invalid.';
    // return next(err)
    return res.json({title: err.title, message: err.message })
  }

});

// TODO: add get route for loggedIn page

router.get("/loggedIn", csrfProtection, function(req, res){
  const reqCookies = req.cookies

  if (!reqCookies.session_id) {
    
    res.redirect('/WTA-794')
  }

  res.render('loggedIn', { csrfToken: req.csrfToken()})
});


// Completed: add delete route
router.delete("/session", function(req, res) {
  res.clearCookie('session_id');
  res.clearCookie('_csrf');
  return res.json({ message: 'Successfully Logged Out!'})
})



module.exports = router;
