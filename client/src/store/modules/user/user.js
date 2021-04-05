import api from '@/api/ApiService';
// import { response } from '../../../../../server/app';
// import { Result } from 'ant-design-vue';
import * as types from './mutation_types';


const state = {
    user : {
        userId: '',
        name : '',
        nickName: '',
        id: '',
        password: '',
        userImg: '',
        // ex: '222', "http://localhost:8080/1613228452118.jpg"
        // user_id: '1',  ./1612982928920.jpg          1612982928920.jpg  
        // name : '조민지',
        // nickName: 'jominji12',  file:///C:/Vue_project/pet_board_2/server/public/images/1613228452118.jpg
        // id: 'jominji12',
        // password: 'alswl12',
        // userImg: '', server\public\images\1612983369062.jpg  /Vue_project/pet_board_2/server/public/images/1612983369062.jpg
        //C:\Vue_project\pet_board_2\server\public\images\1612983279215.jpg
    },
    loginStatus: false,
    loginLoading: false,
};

const getters = {
    user: (state) => { 
        return state.user; 
    },

    loginStatus: (state) => {
        return state.loginStatus;
    },

    userImg : (state) => {
        return state.user.userImg;
    },
    nickName : (state) => {
        return state.user.nickName; // 근데 이건 꼭 해야하는것일까ㅏㅏ 일단 주석처리하고 돌려볼껏!
    }   

};

const mutations = {
    
    setUser( state , user ) { 
        state.user.userId = user.user_id ;
        state.user.name = user.name;
        state.user.nickName = user.nickname;
        state.user.id = user.id;
        state.user.password = user.password;  
    },
    [types.FETCH_USER_NICKNAME] ( state , nickName) {
        state.user.nickName = nickName;
    },
    [types.FETCH_USER_PASSWORD] (state , password){
        state.user.password = password;
    },
    setUserImage( state , userImage) {
        state.user.userImg = userImage;
    },

    fetchLoginStatus( state, loginStatus){
        state.loginStatus = loginStatus;
    },
    logout( state ) {
        state.user = {};
        state.loginStatus = false;
        localStorage.clear(); 
    }
};  

const actions = {

    loginProcess : async ({ commit }, payload) => {
        const { id , password } = payload; 
        console.log('여기는 스토어의 액션!! ',id, password);
        const loginResult = await api.login(id , password)
            .then(results => results.data)
            .catch(err => err);
        console.log('여기는 user.js => 로그인 결과는?!! ',loginResult , '로그인 유저 정보는 : ', loginResult.user, '로그인 status 정보 :',loginResult.loginStatus);
        console.log('유저이미지는 어떻게 뜰깡 => ',loginResult.user.user_image);
        if ( loginResult.loginStatus ) {
            commit('setUser', loginResult.user );
            commit('fetchLoginStatus', loginResult.loginStatus);
            if(loginResult.user.user_image){
                console.log('유저이미지가 있을때 뜨는 로그입니당');
                commit('setUserImage',loginResult.user.user_image);
            }
        }
    },



    logoutProcess: async ({ commit })=>{
        console.log('store의 로그아웃에 들어옴!');
        await api.logout()
        .then(results => results.data)
        .catch(err => err)

        commit('logout');
    }, 

    profileUpdateProcess: async ({ commit }, payload) => {
        const { formData } = payload;
       
        const imgUpdateResult = await api.updateProfile(formData)
            .then(results=>results.data)
            .catch(err=>err);
        
        let image = imgUpdateResult.user_image;
        commit('setUserImage',image);
    },


    
    basicProfileProcess: async ({ commit }) =>{
        // const basic

    },
    
    


};


export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};





  