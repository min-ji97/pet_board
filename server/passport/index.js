const LocalStrategy =require('passport-local').Strategy;
// var mysql = require('mysql');

var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

console.log("passport의 index.js!!!!!!!!!");
console.log("");
exports.config = function(passport){
    console.log("패스포트 인덱스.js");

    //serializeUser에서 done(null,user.id)를 호출하면 세션에 id값이 저장된다.
    passport.serializeUser(function(user, done){
        console.log('=======<serializeUser> 실행 =======');
        console.log("serializeUser : ", user);
        done(null,user.id);
        
    });

//로그인에 성공하고 페이지를 방문할 때마다 호출된다. 
//deserializeUser가 호출되면 request.user 라는 객체가 생성되므로 유저에 대한 정보를 손쉽게 사용할 수 있다.
    passport.deserializeUser(function(id, done){
        console.log('=======<deserializeUser> 로그인에 성공하고 방문할때 마다 떠야함^^=======');
        console.log("deserializeUser : ", id);
        var userinfo;
        // var hhh = { loginStatus : false};
        var sql = 'select * from user where id = ?';
        connection.query(sql,[id],function(err,result){
            if(err) console.log('mySql 에러');

            console.log("deserializeUser mySql result : ", result);
            var json = JSON.stringify(result[0]);
            userinfo = JSON.parse(json);
            // //////////////
            // hhh = { loginStatus : true };
            // var jsonTwo = JSON.stringify(hhh);
            // var fff = JSON.parse(jsonTwo)
            console.log('유저 인포니?!',userinfo);
            // console.log('loginStatus어떻게 뜨니?? => ',fff);
            // var result = Object.assign({},userinfo, fff);
            // console.log('결과는==>>>>',result);
            //done(null,user);
        //    console.log('sdfsdf',{userinfo , loginStatus: true});
            // var hhh = { userinfo , loginStatus : true}
            
            done(null, userinfo);
        });
});




passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password'
    },
    //여기서 done는 함수. 로그인의 성공 유무에 따라 다르게 동작하도록 설계되어있음.
    function(username, password, done){
        console.log("=======< new LocalStrategy 실행 >=======");
        var sql = "select * from user where id = ? and password = ?";
        var params = [username, password];

        // try{
        //     console.log('try문');
        //     mysql_dbc.query(sql, params , function(err,result){
        //         if(err) console.log('mysql 에러');
    
        //         if(result.length === 0){ // ID 와 PW가 회원정보에 없음 
        //             console.log("결과 없음");
        //             return done(null, false ,{message: 'Incorrect'});
        //         }else{
        //             console.log("회원정보 일치 있음 : 결과 : ",result);
        //             var json = JSON.stringify(result[0]);
        //             var userinfo = JSON.parse(json);
        //             console.log("userinfo"+ userinfo);
        //             return done(null , userinfo); //result 값으로 받아진 회원정보를 retrun 해준다.
        //         }
              
        //     });
        //     console.log('try문2 2여긴 실행안될듯.....');
        // }catch(e){
        //    console.log('catch문');
        //    console.log(`에러 => ${e.name} ,${e.message}`);
        // }


        connection.query(sql, params , function(err,result){
            if(err) console.log('mysql 에러');

            if(result.length === 0){ // ID 와 PW가 회원정보에 없음 
                console.log("결과 없음");
                return done(null, false ,{message: 'Incorrect'});
            }else{
                console.log("회원정보 일치 있음 : 결과 : ",result);
                var json = JSON.stringify(result[0]);
                var userinfo = JSON.parse(json);
                console.log("userinfo"+ userinfo);
                return done(null , userinfo); //result 값으로 받아진 회원정보를 retrun 해준다.
            }
          
        });
    
    }
));



// router.get('/main', function(req , res , next){
//     res.render('main',{"user_id" : req.user.ID});
// });

// router.post('/loginAf',
//     passport.authenticate('local',{ 
//         successRedirect: '/',  // 로그인 성공시 경로
//         failureRedirect: '/login',  //로그인 실패 시 경로
//         failureFlash: true   //로그인에 실패했을 시, 실패 메세지를 출력할지 말지 여부,
                        
//     }))


};















// const LocalStrategy =require('passport-local').Strategy;
// // const users = require('../data/users.json');


// const usersInfo = require('../service/userInfo');
// const users = usersInfo.user;

// var mysql_dbc = require('../db/db_con')();
// var connection = mysql_dbc.init();
// mysql_dbc.test_open(connection);


// exports.config = (passport) => {

//     passport.serializeUser((user,done)=>{
//         done(null,user.id);
//     });
//     passport.deserializeUser((id,done)=>{
//         const result = users.filter((user)=>user.id === id);
//         if (result.length > 0) {
//             done(null, result[0]);
//         }
//     });


//     passport.use(new LocalStrategy(
//         function(id,password){
//             var sql = 'select * from user where id =?';
//             connect.query(sql,[id],function(err,results){
//                 if(err){
//                     return done(err);
//                 }
//                 if(!results[0]){
//                     return done('please check your id.');
//                 }

//                 var user = results[0];

//             })
//         }
//     ))

// // passport.use(new LocalStrategy({
// //         usernameField: 'id',
// //         passwordField: 'password',
// //     },(id,password,done) => {
// //         const result = users.filter((user)=> user.id === id);
// //         if (result.length > 0) {
// //             const user = result[0];
// //             if(password === user.password) {
// //                 done(null , user);
// //             }else {
// //                 done(null, false, { message : '비밀번호 틀림 '});
// //             }
// //         }else {
// //             done(null, false, { message : '가입되지 않은 회원' });
// //         }
// //     }));
// }