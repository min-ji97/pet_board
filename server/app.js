var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(expressSession);

/////
// var MySQLStore = require('express-mysql-session')(session);

////////

const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); // 필요 없음 나중에 지울것
var authRouter = require('./routes/auth');
var userInfoRouter = require('./routes/userInfo');
var updateRouter = require('./routes/update');
var postRouter = require('./routes/post');
var tapRouter = require('./routes/tap');

var app = express();

var mysql = require('mysql');

app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





// app.use(express.bodyParser());

// app.configure(function () {

//   app.use(express.bodyParser());
 
//  });






app.use(cookieParser());  


// app.use(fileUpload());1

// app.use(fileUpload({
//         createParentPath: true
// }
// ))


app.use(express.static(path.join(__dirname, 'public')));


require('./passport').config(passport);
require('dotenv').config();




// app.post('./routes/userInfo/changeProfile',(req,res))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//   }
// }));

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
    // store: new MySQLStore({
    //   host: 'localhost',
    //   user: 'root',
    //   password: '1234',
    //   database: 'pet_board',
    // }),
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
app.use('/users', usersRouter); // 지울예정
app.use('/api/auth', authRouter);
app.use('/api/userInfo', userInfoRouter);
app.use('/api/update', updateRouter);
app.use('/api/post', postRouter);
app.use('/api/tap', tapRouter);

// app.post('/api/userInfo/changeProfile',(req,res)=>{

//     console.log('제발..........',req.file);
//     console.log('이것도 안되면 싸우쟈', req.body);

//     var file;

//     if(!req.file){
//         res.send("파일을 찾지 못하였습니다^^");
//         return;
//     }
//     file = req.files.FormFieldName;
//     res.send("파일을 찾음~~");
 
// })

  


// app.use('/api/logout', loginRouter);



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