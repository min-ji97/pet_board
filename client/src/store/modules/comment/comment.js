import api from '@/api/ApiService';
import * as types from './mutation_types';

// import * as types from './mutation_types';

const state = {
    
    mainComment : [],
    // content_id , content , nickname , preview_image, title , create_at , like_num , view_num
    askComment : [],
    // askContentsPreview: [],
};

const getters = {
    mainCommentList : (state)=>{
        return state.mainComment;
    },
    askCommentList : (state) =>{
        return state.askComment;
    },
};

const mutations = {
    [types.GET_MAIN_COMMENT]( state , contents) {
        state.mainComment = contents;
    },
    [types.GET_ASK_COMMENT]( state , contents) {
        state.askComment = contents;
    }
};  

const actions = {
 
    getMainCommentProcess: async ({commit}) => {
        const result = await api.getMainComment()
            .then(res=>res)
            .catch(err=>err)

            console.log('메인 댓글 결과! result => ', result.data);
            commit('GET_MAIN_COMMENT',result.data);
    },

    getAskCommentProcess: async ({commit})=>{
        const result = await api.getAskComment()
            .then(res=>res)
            .catch(err=>err)

            console.log('질문 댓글 결과! result => ',result.data);
            commit('GET_ASK_COMMENT',result.data);

    },

};




export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};

  