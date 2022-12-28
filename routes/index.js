var express = require('express');
var router = express.Router();
const csrf = require('csurf');

var csrfProtection = csrf( { cookie: true } );

/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {
  res.render('login', { csrfToken: req.csrfToken()});
});

module.exports = router;
