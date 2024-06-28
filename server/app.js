var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var history = require('connect-history-api-fallback');

var passport = require('passport');

var MySQLStore = require('express-mysql-session')(expressSession);


const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users'); // 필요 없음 나중에 지울것
var authRouter = require('./routes/auth');
var userInfoRouter = require('./routes/userInfo');
var updateRouter = require('./routes/update');
var postRouter = require('./routes/post');
var tapRouter = require('./routes/tap');
var commentRouter = require('./routes/comment');

var app = express();

var mysql = require('mysql');

app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(history());

app.use(cookieParser());  


app.use(express.static(path.join(__dirname, 'public')));


require('./passport').config(passport);
require('dotenv').config();





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(cookieParser(process.env.COOKIE_SECRET));


var option = {
    host: 'localhost', //localhost:7896
    port: '3306',
    user: 'root',
    password:'minji1372!',
    database: 'pet_board'
};

var sessionStore = new MySQLStore(option);

app.use(expressSession({
    key: 'session_cookie_name', // sid
    secret: 'session_cookie_secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
}));

// 미들웨어 장착

//app.use(express.urlencoded({ extended: true})); //클라이언트의 form값을 req.body에 넣는다는데????
app.use(passport.initialize()); // passport를 사용하도록
app.use(passport.session());   // passport 사용 시 session 활용

// require('./passport').config(passport); 앞에 있음
// require('dotenv').config();



app.use('/', indexRouter);
// app.use('/users', usersRouter); // 지울예정
app.use('/api/auth', authRouter);
app.use('/api/userInfo', userInfoRouter);
app.use('/api/update', updateRouter);
app.use('/api/post', postRouter);
app.use('/api/tap', tapRouter);
app.use('/api/comment',commentRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;