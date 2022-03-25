import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {

    // homeWriteContents : [],
 

};

const getters = {

    // homeWriteContentList : (state)=>{
    //     return state.homeWriteContents;
    // },

    
};

const mutations = {
    // [types.GET_REGISTER]( state, contents) {
    //     state.homeLikeContents = contents;
    // },
 
};  

const actions = {

    //회원가입
    registerProcess: async ({commit}, payload) => {
        console.log('회원가입.js로 넘어옴..!',payload);
        
        const { name, nickName, id, password } = payload;
        const result = await api.register(name, nickName, id, password)
            .then(res=>res)
            .catch(err=>err)

            console.log('회원가입 결과 ', result.data);
            // commit('GET_REGISTER',result.data);
    },
   
 
};




export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};

  