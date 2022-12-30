var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const { generateKey } = require('../utils/utils') ;

var csrfProtection = csrf( { cookie: true } );

const users = [ 
  { id: 1, username: "theuser", password: "abc123" },
  { id: 2, username: "appe_bq", password: "apple" },
  { id: 3, username: "test@test.com", password: "test"}
]

router.get('/', csrfProtection, function(req, res, next) {
  res.render('loginForm', { csrfToken: req.csrfToken()});
});

router.post('/session', csrfProtection, function(req, res, next){
  
  const { username, password } = req.body;

  if (users.find( user => user.username === username && user.password === password )) {

    // TODO: set session ID to cookies
    res.cookie('sessionID', generateKey());
    res.redirect('/WTA-794/loggedIn')

  } else {
    // TODO: error handler
    console.log("no")
  }

});

// TODO: add get route for loggedIn page

router.get("/loggedIn", csrfProtection, function(req, res){

  // TODO: determine if there's a session ID, if there is, render the page, if not, show error
  res.render('loggedIn', { csrfToken: req.csrfToken()})
});


// TODO: add delete route
router.delete("/session", function(req, res) {
  res.clearCookie('sessionID');
  res.clearCookie('_csrf');
  return res.json({ message: 'Successfully Logged Out!'})
})



module.exports = router;
