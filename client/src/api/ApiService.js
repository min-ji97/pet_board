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
   * 회원가입
   * @param name
   * @param nickName
   * @param id
   * @param password
   * @returns {AxiosPromise<any>}
   */
  register(name, nickName, id, password) {
    console.log('api 회원가입입니다.',name,nickName,id,password);
    return axios.post('/api/post/register',{
      name,
      nickName,
      id,
      password,
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

/**
 *  프로필 기본으로 변경 (기존 프로필 삭제 )
 * 
 */
deleteProfile(userId){
  return axios.post('/api/userInfo/deleteProfile',{
    userId
  });

},
/*
*  프로필 사진 변경 
*  
*
*/ 
updateProfile(formData){
  return axios.post('/api/userInfo/updateProfile', formData);
},

/*
*
* 닉네임 중복검사
*
*/
NicknameCheck(changeNickname){
  console.log('여기는 닉네임 중복 체크 api', changeNickname);
  return axios.post('/api/update/nickNameCheck',{
    changeNickname,
  })
},

/*
*
* 아이디 중복검사
*   
*/
idCheck(changeId){
  console.log('아이디 중복 체크 api', changeId);
  return axios.post('/api/update/idCheck',{
    changeId,
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

/**
 * 
 *  게시글 수정 - main
 * 
 */
 updateMain(userId,contentId,title,contents,previewImg){
  console.log('axios main : ' ,userId,contentId,title,contents,previewImg);
  return axios.post('/api/update/updateMain',{
    userId,
    contentId,
    title,
    contents,
    previewImg
  }); 
},

/*
 *  게시글 수정 - ask
 * 
 */
updateAsk(userId,contentId,title,contents){
  console.log('axios ask : ', userId,contentId,title,contents);
  return axios.post('/api/update/updateAsk',{
    userId,
    contentId,
    title,
    contents,
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
homeWritePreview(userId) {
  return axios.post('/api/tap/homeWritePreview',{
    userId,
  })
},

/*
* 
* 좋아요 - Home
*
*/
homeLikePreview(userId) {
  return axios.post('/api/tap/homeLikePreview',{
    userId
  })
},

/*
* 
* 내가 쓴 글 보여주기 - Ask
*
*/
askWritePreview(userId) {
  return axios.post('/api/tap/askWritePreview',{
    userId
  })
},

/*
* 
* 좋아요 - Ask
*
*/
askLikePreview(userId) {
  return axios.post('/api/tap/askLikePreview',{
    userId
  })
},

/**
 * 
 * 댓글 불러오기 - main comment
 * 
 */

getMainComment(){
  return axios.get('/api/comment/getMainComment')
},

/**
 * 
 * 댓글 불러오기 - ask comment
 * 
 */

 getAskComment(){
  return axios.get('/api/comment/getAskComment')
},

/**
 * 
 * 댓글 작성 - main 
 * 
*/
writeMainComment( contentId , userId, context){
  return axios.post('/api/comment/writeMainComment',{
    contentId,
    userId,
    context
  })
},

/**
 * 
 * 댓글 작성 - ask
 * 
*/
writeAskComment( contentId , userId, context){
  return axios.post('/api/comment/writeAskComment',{
    contentId,
    userId,
    context
  })
},

/**
 * 
 * 게시글 삭제
 * 
 */

deletePost( contentId, boardNum){
  return axios.post('/api/post/deletePost', {
    contentId,
    boardNum
  })
},

/**
 * 
 * 댓글 삭제
 * 
 */

 deleteComment( contentId, boardNum, commentId){
  return axios.post('/api/comment/deleteComment', {
    contentId,
    boardNum,
    commentId
  })
},




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
