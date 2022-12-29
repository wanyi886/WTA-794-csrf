var express = require('express');
var router = express.Router();
const csrf = require('csurf');

var csrfProtection = csrf( { cookie: true } );


router.get('/', csrfProtection, function(req, res, next) {
  res.render('loginForm', { csrfToken: req.csrfToken()});
});

router.post('/process', csrfProtection, function(req, res, next){
  res.send('Successfully Validated!')
} )

module.exports = router;
