import api from '@/api/ApiService';



const state = {
    nicknameCheck: '', // 업데이트 + 회원가입에서 사용
    idCheck: '',   // 회원가입에서 사용
};

const getters = {
    nickNameCheck : (state) =>{
        return state.nicknameCheck;
    },
    idCheck : (state) => {
        return state.idCheck;
    }

};

const mutations = {
 
    setNicknameCheck ( state , checkResult ){
        state.nicknameCheck = checkResult;
    },
    setIdCheck ( state , checkResult ){
        state.idCheck = checkResult;

    }
};  

const actions = {
    nicknameCheckProcess: async({commit},payload) =>{  //중복 검사  ( 회원가입에서도 재사용!! )
        const {  changeNickname } = payload;
        const checkResult = await api.NicknameCheck(changeNickname)
            .then(result => result.data)
            .catch(err => err)
            commit('setNicknameCheck',checkResult);
            console.log('STORE임 중복검사의 결과는?! ',checkResult); // checkResult에 값이 있으면 중복
        
        

        if(checkResult){ // 중복X === true
            console.log('중복이 아니요!!!!!!!!!!!!!!!!');
           
        }else {  //중복 === false
            console.log('중복입니다!!! 사진을 못 바꾸오!!! ');
        }
    },

    idCheckProcess: async({commit},payload) =>{  //중복 검사 아이디..! ( 회원가입에서 사용합니다 )
        const {  changeId } = payload;
        const checkResult = await api.idCheck(changeId)
            .then(result => result.data)
            .catch(err => err)
            commit('setIdCheck',checkResult);
            console.log('STORE임 중복검사의 결과는?! ',checkResult); // checkResult에 값이 있으면 중복
        
        

        if(checkResult){ // 중복X === true
            console.log('중복이 아니요!!!!!!!!!!!!!!!!');
           
        }else {  //중복 === false
            console.log('중복입니다!!! 사진을 못 바꾸오!!! ');
        }
    },

    updateNicknameProcess: async({ commit },payload)=>{
        const { userId , changeNickname }= payload;
        const updateResult = await api.updateNickname(userId,changeNickname)
            .then(result => result.data)
            .catch(err => err)
            commit('user/FETCH_USER_NICKNAME' , updateResult.nickname, { root: true });
    },
    updatePwProcess : async({ commit },payload) =>{
        const { userId , newPassword } = payload;
        const updatePwResult = await api.updatePw(userId, newPassword)
        .then(results => results.data)
        .catch(err => err)
        commit('user/FETCH_USER_PASSWORD',updatePwResult.password, { root: true })
    },
};


export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};





  