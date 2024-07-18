const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/go',function(req, res, next){
    console.log("=======< get '/login'>=======");
    console.log("req.seesion.passport가 존재하는가????? =>  ", req.session.passport);

    if(req.isAuthenticated() && req.user){
        console.log("잘 넘어왔는가???! 1111");
        
        return res.json({ user : req.user , loginStatus: true });
    }
    return res.json({ user : null });
});


router.post('/login',function(req,res,next){
    console.log("=======< post '/login'> 경로로 들어옴 =======");
    if(req.isAuthenticated()){
        console.log("<req.isAuthenticated 실행>");
        return res.json({ user : req.user ,loginStatus: true}); 
     
    }

    passport.authenticate('local', (authError, user, info)=>{
        console.log("=======<passport.authenticate 실행>=======");

        if(authError) {  // 서버 에러가 있는 경우 
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.json(info);
        }   
        return req.login(user, (loginError) => { //req.login()요청으로 passport.serializeUser() 실행
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
     
           return res.json({ user , loginStatus :true});
           

        });
    })(req, res,next);
});

 // return res.json({newfilteredUSer});
            // const loginStatus = true;
            // const filteredUser = Object.assign(user.toJSON(), loginStatus );
            // // user 객체는 sequelize 객체이기 때문에 순수한 JSON으로 만들기 위해 user.toJSON()
            // // user.toJSON() 하지 않으면 에러 발생
            //  // toJSON()을 붙여주는 이유는 서버로부터 전달받은 데이터를 변형하기 때문임.
            //  delete filteredUser.password; // 서버로부터 전달받은 데이터를 변형하지 않는다면
            //  return res.json(filteredUser); // toJSON()을 붙이지 않고 바로 응답하여도 무방


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
        res.redirect('/');
    }
  })

module.exports = router;