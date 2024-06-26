import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
    
    mainComment : [],
    askComment : [],
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
    },

    // [types.UPDATE_MAIN_COMMENT](state, contents) {

    // },
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
    writeMainComment: async({commit},payload)=>{
        const { contentId , userId, context } = payload;
        const result = await api.writeMainComment(contentId, userId, context)
            .then(res=>res)
            .catch(err=>err)   
    },

    writeAskComment: async({commit},payload)=>{
        const { contentId , userId, context } = payload;
        const result = await api.writeAskComment(contentId, userId, context)
            .then(res=>res)
            .catch(err=>err)
    },

    deleteCommentProcess : async ({commit},payload) =>{
        const { contentId , boardNum} = payload;
        const result = await api.deleteComment(contentId, boardNum)
            .then(res=>res)
            .catch(err=>err);
            
    },

    changeMainComment : async({commit}, payload) => {
        const { commentId, contentId, context } = payload;
        const result = await api.updateMainComment( commentId, contentId, context)
            .then(res=>res)
            .catch(err=>err)

        
            commit();
            
            console.log(' 여기는 store 결과를 잘 받아왔는가! => ',result);
    },
    changeAskComment : async({commit}, payload) => {
        const { commentId, contentId, context } = payload;
        const result = await api.updateAskComment( commentId, contentId, context)
            .then(res=>res)
            .catch(err=>err)
    }

};




export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};

  