import axios from 'axios';

export default {

  /**
   * 로그인
   * @param id
   * @param password
   * @returns {AxiosPromise<any>}
   */
  login(id, password) {
    console.log('로그인 api입니다 넘어온 id와 pw => ',id,password);
    return axios.post('/api/auth/login', {
      id,
      password,
    });
  },

  /**
   * 회원가입c
   * @param id
   * @param password
   * @returns {AxiosPromise<any>}
   */
  register() {
    return axios.post({

    });   
  },
  /**
   * 로그아웃
   * 
   * 
   */
  logout(){
    console.log('여기는 로그아웃 api');
    return axios.get('/api/auth/logout');
  },
////////////////////////////////
  // changeProfile(file){
  //   console.log('changeProgile api입니당dfdsfsdfsdfsfsf', file);
  //   return axios.post('/api/userInfo/changeProfile', file,
  //    {

  //     headers: {
  //       'Content-Type' : 'multipart/form-data'
  //     }

  //   }
  //   );
  // },
///////////////////////////////////
  // changeProfile(file){
  //   console.log('changeProgile api입니당dfdsfsdfsdfsfsf', file);
  //   return axios.post('/api/userInfo/changeProfile', file
  //   );
  // },
//////////////////////////////////
//   changeProfile(file){
//     console.log('axios사용법 수정해봄 file은 뭐라고 뜰까^^ => ',file);
//   return axios({
    
//     method: 'post',
//     url: '/api/userInfo/changeProfile',
//     data: file, 
//     headers : { 
//       'Content-Type':'multipart/form-data, boundary=${form._boundary}'
//     }
    
//   });  
// },
///////////////////////////////////

/*
*  프로필 사진 변경 
*  
*
*/ 
updateProfile(formData){
  // console.log('유저아이디는?! 여기는 api',userId);
  return axios.post('/api/userInfo/updateProfile', formData);
},

/*
     닉네임 중복검사
*/
NicknameCheck(changeNickname){
  console.log('여기는 닉네임 중복 체크 api', changeNickname);
  return axios.post('/api/update/nickNameCheck',{
    changeNickname,
  })
},

/*
* 닉네임 변경 
*/
updateNickname(userId,changeNickname){
  console.log('여기는 닉네임 변경 api', userId,changeNickname);
  return axios.post('/api/update/updateNickname',{
    userId,
    changeNickname
  })
},
/*
* 비밀번호 변경
*/
updatePw(userId, newPassword){
  return axios.post('/api/update/updatePw',{
    userId,
    newPassword
  })
},

getMainPostPreview(){
  return axios.get('/api/post/getMainPostPreview')
},
getAskPostPreview(){
  return axios.get('/api/post/getAskPostPreview')
},
/*
*  게시글 작성 컨텐츠 사진 업로드   ( 글 작성 완료 전에 사진부터 업로드 )
*
*/
uploadContentImg(formData){
  return axios.post('/api/userInfo/uploadContentImg',formData)
},

/*
 *  메인 게시글 작성 
 *  
 */
mainWrite(userId,title,contents,previewImg){
  return axios.post('/api/post/mainWrite',{
    userId,
    title,
    contents,
    previewImg
  }); 
},

/*
 *  추천 및 질문 게시글 작성 
 * 
 */
askWrite(userId,title,contents,boardNum){
  return axios.post('/api/post/askWrite',{
    userId,
    title,
    contents,
    boardNum
  })
},

/*
*  조회수 
*
*/
viewUp(contentId,boardNum){
  return axios.post('/api/post/viewUp',{
    contentId,
    boardNum
  })
},

/*
* 
* 내가 쓴 글 보여주기 - Home
*
*/
getHomeWritePreview() {
  return axios.get('/api/tap/getHomeWritePreview')
},

/*
* 
* 좋아요 - Home
*
*/
getHomeLikePreview() {
  return axios.get('/api/tap/getHomeLikePreview')
},

/*
* 
* 내가 쓴 글 보여주기 - Ask
*
*/
getAskWritePreview() {
  return axios.get('/api/tap/getAskWritePreview')
},

/*
* 
* 좋아요 - Ask
*
*/
getAskLikePreview() {
  return axios.get('/api/tap/getAskLikePreview')
}


// changeProfile(file,config){
//     return axios.post('/api/userInfo/changeProfile', file, config);
//   },


//   changeProfile(file,config){
//   return axios({
    
//     method: 'post',
//     url: '/api/userInfo/changeProfile',
//     data: { file, config} ,    
//   });  
// },




// formData, 
// {
//   headers: {
//       'Content-Type': 'multipart/form-data'
//   }
// }
//   

  
  // sessionLogin() {
  //   return axios.get('/api/user/login');
  // },

  // sessionInit() {
  //   return axios.delete('/api/user/login');
  // },

  
};
