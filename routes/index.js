var express = require('express');
var router = express.Router();
const csrf = require('csurf');

var csrfProtection = csrf( { cookie: true } );

const users = [ { id: 1, username: "theuser", password: "abc123"} ]

router.get('/', csrfProtection, function(req, res, next) {
  res.render('loginForm', { csrfToken: req.csrfToken()});
});

router.post('/session', csrfProtection, function(req, res, next){
  
  const { username, password } = req.body;

  if (users.find( user => user.username === username && user.password === password )) {

    // TODO: set session ID to cookies

    res.render('loggedIn', { csrfToken: req.csrfToken()} )
  } else {
    // TODO: error handler
    console.log("no")
  }

})

// TODO: add get route for loggedIn page
// TODO: add delete route



module.exports = router;
