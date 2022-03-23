import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {

    homeWriteContents : [],
 

};

const getters = {

    homeWriteContentList : (state)=>{
        return state.homeWriteContents;
    },

    
};

const mutations = {
    [types.GET_HOME_LIKE_PREVIEW]( state, contents) {
        state.homeLikeContents = contents;
    },
 
};  

const actions = {

    //내가 쓴 글 (Home)
    tapHomeWriteProcess: async ({commit},payload) => {
        const { userId } = payload;
        const result = await api.homeWritePreview(userId)
            .then(res=>res)
            .catch(err=>err)

            console.log('home 내가 쓴 글 결과', result.data);
            commit('GET_HOME_WRITE_PREVIEW',result.data);
    },
   
 
};




export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};

  