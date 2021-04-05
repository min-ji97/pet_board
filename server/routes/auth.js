const express = require('express');
const router = express.Router();
const passport = require('passport');

// var LocalStrategy = require('passport-local').Strategy;

// var mysql_dbc = require('../service/service.config')();


////////아래 세줄 필요가 없는듯 해서 지우는것임1!! 
                // var mysql_dbc = require('../db/db_con');
                // var connection = mysql_dbc.init();
                // mysql_dbc.test_open(connection);
// //////////////




// const usersInfo = require('../service/userInfo');
// const users = require('../data/users.json');



// //serializeUser에서 done(null,user.id)를 호출하면 세션에 id값이 저장된다.

// passport.serializeUser(function(user, done){
//     console.log("serializeUser : ", user);
//     done(null,user.ID);
// });

// //로그인에 성공하고 페이지를 방문할 때마다 호출된다. 
// //deserializeUser가 호출되면 request.user 라는 객체가 생성되므로 유저에 대한 정보를 손쉽게 사용할 수 있다.
// passport.deserializeUser(function(id, done){
//     console.log("deserializeUser : ", id);
//     var userinfo;
//     var sql = 'select * from user where id = ?';
//     mysql_dbc.query(sql,[id],function(err,result){
//         if(err) console.log('mySql 에러');

//         console.log("deserializeUser mySql result : ", result);
//         var json = JSON.stringify(result[0]);
//         userinfo = JSON.parse(json);
//         done(null, userinfo);
//     });
// });


// passport.use(new LocalStrategy({
//     usernameField: 'id',
//     passwordField: 'password'
//     },
//     //여기서 done는 함수. 로그인의 성공 유무에 따라 다르게 동작하도록 설계되어있음.
//     function(username, password, done){
//         var sql = "select * from user where id = ? and password = ?";
//         mysql_dbc.query(sql, [username,password], function(err,result){
//             if(err) console.log('mysql 에러');

//             if(result.length ===0){ // ID 와 PW가 회원정보에 없음 
//                 console.log("결과 없음");
//                 return done(null, false ,{message: 'Incorrect'});
//             }else{
//                 console.log("회원정보 일치 있음 : 결과 : ",result);
//                 var json = JSON.stringify(result[0]);
//                 var userinfo = JSON.parse(json);
//                 console.log("userinfo"+ userinfo);
//                 return done(null , userinfo); //result 값으로 받아진 회원정보를 retrun 해준다.
//             }
          
//         })
    
//     }
// ));


// router.get('/main', function(req , res , next){
//     res.render('main',{"user_id" : req.user.ID});
// });

// router.post('/loginAf',
//     passport.authenticate('local',{ 
//         successRedirect: '/',  // 로그인 성공시 경로
//         failureRedirect: '/login',  //로그인 실패 시 경로
//         failureFlash: true   //로그인에 실패했을 시, 실패 메세지를 출력할지 말지 여부,
                        
//     }))

// app.post('/api/login',
//   passport.authenticate('local', {
//     successRedirect: '/',  // 로그인 성공시 경로
//     failureRedirect: '/login',  //로그인 실패 시 경로
//     failureFlash: true   //로그인에 실패했을 시, 실패 메세지를 출력할지 말지 여부
//   })
// );
/////////////////////////////////////




router.get('/go',function(req, res, next){
    console.log("=======< get '/login'>=======");
    console.log("req.seesion.passport가 존재하는가????? =>  ", req.session.passport);
    console.log("왜안돼 띠뱌ㅑㅑ",req.user);
    if(req.isAuthenticated() && req.user){
        console.log("잘 넘어왔는가???! 1111");
        
        return res.json({ user : req.user , loginStatus: true });
    }
    return res.json({ user : null });
});


// router.post('/login', passport.authenticate('local',{
//     successRedirect: '/welcome',
//     failureRedirect: '/login',
//     failureFlash: true
// }))





////////////////////////////////// 임시로 잠깐 막아둠!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post('/login',function(req,res,next){
    console.log("=======< post '/login'> 경로로 들어옴 =======");
    if(req.isAuthenticated()){
        console.log("<req.isAuthenticated 실행>");
        console.log("잘 넘어왔는가???! 22222222222");
        //return res.json({ user , loginStatus: true });
        return res.json({ user : req.user ,loginStatus: true}); 
        // res.redirect('/welcome');




        // next();
    }
    // if (req.session.user) {
    //     console.log('이미 로그인 되어 있음');

    //     res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
    //     res.write('<h1>already Login</h1>');
    //     res.write('[ID] : ' + paramID + ' [PW] : ' + pw);
    //     res.write('<a href="/process/product">Move</a>');
    //     res.end();

    // }
    passport.authenticate('local', (authError, user, info)=>{
        console.log("=======<passport.authenticate 실행>=======");
        console.log("잘 넘어왔는가???!33333333333333333 여길들어와야 로그인 성공인듯함");
        if(authError) {  // 서버 에러가 있는 경우 
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.json(info);
        }   // 010 2550 0501 ///////// 010 3087 7308
        return req.login(user, (loginError) => { //req.login()요청으로 passport.serializeUser() 실행
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            console.log("req.seesion.passport가 존재하는가????? =>  ",  );
            // let loginStatus = true;
            // let newfilteredUSer = Object.assign({},user, loginStatus);
            // console.log('뉴필터유저',newfilteredUSer);

            // const fillteredUser = { ...user.dataValues };
            // delete fillteredUser.password;
            // return res.json(fillteredUser);
            //return res.json({ user });
            console.log('user:',user);
           return res.json({ user , loginStatus :true});
            // return res.json({newfilteredUSer});

            // const loginStatus = true;
            // const filteredUser = Object.assign(user.toJSON(), loginStatus );
            // // user 객체는 sequelize 객체이기 때문에 순수한 JSON으로 만들기 위해 user.toJSON()
            // // user.toJSON() 하지 않으면 에러 발생
            //  // toJSON()을 붙여주는 이유는 서버로부터 전달받은 데이터를 변형하기 때문임.
            //  delete filteredUser.password; // 서버로부터 전달받은 데이터를 변형하지 않는다면
            //  return res.json(filteredUser); // toJSON()을 붙이지 않고 바로 응답하여도 무방

        });
    })(req, res,next);
});


////////////////////////////////////////////////


// router.get('/welcome',(req,res) => {
//     console.log('세션이 있어서 웰컴에 들어옴!');
//     if(req.isAuthenticated() && req.user){
//         console.log('흐하하ㅏㅏ');
//         return res.json({ user : req.user , loginStatus: true });
//     } else {
//         console.log('로그아웃 시켜줘라!!');
//     }
    
// })








// router.get('/welcom',(req,res)=>{
//     if(req.user && req.user.id){
//         res.render('welcome',{dname: req.user.id});
//     } else {
//         res.render('failLogin');
//     }
// });




router.get('/logout', ( req, res ) => {
   
    console.log('1',req.session);
    console.log('2',req.session.passport.user);
    console.log('3',req.session.user);
    if (req.session.passport.user) {
        console.log('로그아웃 처리');
        req.session.destroy(
            function (err) {
                if (err) {
                    console.log('세션 삭제시 에러');
                    return;
                }
                console.log('세션 삭제 성공');
                //파일 지정시 제일 앞에 / 를 붙여야 root 즉 public 안에서부터 찾게 된다
                // res.send('로그아웃!');
                res.clearCookie('visitors');
                res.redirect('/');
            }
        );          //세션정보 삭제

    } else {
        console.log('로긴 안되어 있음');
        res.redirect('/');
    }
  })

module.exports = router;