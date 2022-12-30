var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const bodyParser = require('body-parser');

// var parseForm = bodyParser.urlencoded({ extended: false })

const session = require('express-session');
const sessionCofig = session({
  secret: "26267d7287b111eda1eb0242ac120002",
  cookie: {
    sameSite: 'strict',
    httpOnly: true
  }
})

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(sessionCofig)

app.use('/WTA-794', indexRouter);





const port = "1050";

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on PORT ${port}`)
})
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
