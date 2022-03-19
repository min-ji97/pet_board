import api from '@/api/ApiService';
import * as types from './mutation_types';

const state = {
    
    //HOME

    // content_id , content , nickname , preview_image, title , create_at , like_num , view_num
    homeWriteContents : [],
    homeLikeContents : [],
    

    //ASK

    askWriteContents :[], 
    askLikeContents : [],

};

const getters = {

    homeWriteContentList : (state)=>{
        return state.homeWriteContents;
    },
    homeLikeContentList : (state) =>{
        return state.homeLikeContents;
    },

    askWriteContentList : (state)=>{
        return state.askWriteContents;
    },
    askLikeContentList : (state) => {
        return state.askLikeContents;
    },

  
    
};

const mutations = {
    // setIntroContents( state , contents ) { 
    //     state.introContents.userId = contents.userId ; 
    //     state.introContents.contentId = contents.contentId;
    // },

    [types.GET_HOME_WRITE_PREVIEW]( state, contents) {
        state.homeWriteContents = contents;
    },
    [types.GET_HOME_LIKE_PREVIEW]( state, contents) {
        state.homeLikeContents = contents;
    },
    //
    [types.GET_ASK_WRITE_PREVIEW]( state, contents) {
        state.askWriteContents = contents;
    },
    [types.GET_ASK_LIKE_PREVIEW]( state, contents) {
        state.askLikeContents = contents;
    },
};  

const actions = {

    //내가 쓴 글 (Home)
    getTapHomeWriteProcess: async ({commit}) => {
        const result = await api.getHomeWritePreview()
            .then(res=>res)
            .catch(err=>err)

            console.log('home 내가 쓴 글 결과', result.data);
            commit('GET_HOME_WRITE_PREVIEW',result.data);
    },
    // 좋아요 (Home)
    getTapHomeLikeProcess: async ({commit}) => {
        const result = await api.getHomeLikePreview()
            .then(res=>res)
            .catch(err=>err)

            console.log('home 좋아요 결과');
            commit('GET_HOME_LIKE_PREVIEW',result.data);
    },

    // 내가 쓴 글 (ask)
    getTapAskWriteProcess: async ({commit}) => {
        const result = await api.getAskWritePreview()
            .then(res=>res)
            .catch(err=>err)

            console.log('ask 내가 쓴 글 결과', result.data);
            commit('GET_ASK_WRITE_PREVIEW',result.data);
    },

    // 좋아요 (ask)
    getTapAskLikeProcess: async ({commit}) => {
        const result = await api.getAskLikePreview()
            .then(res=>res)
            .catch(err=>err)

            console.log('ask 좋아요 결과' , result.data);
            commit('GET_ASK_LIKE_PREVIEW',result.data);
    },
 
};




export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};

  