import api from '@/api/ApiService';
import * as types from './mutation_types';

// import * as types from './mutation_types';

const state = {
    
    mainContentsPreview : [],
    // content_id , content , nickname , preview_image, title , create_at , like_num , view_num
    askContents : [],
    // askContentsPreview: [],
};

const getters = {
    mainContentList : (state)=>{
        return state.mainContentsPreview;
    },
    askContents : (state) =>{
        return state.askContents;
    },
    
};

const mutations = {
    setIntroContents( state , contents ) { 
        state.introContents.userId = contents.userId ; 
        state.introContents.contentId = contents.contentId;
    },
    [types.GET_MAIN_CONTENT_PREVIEW]( state , contents) {
        state.mainContentsPreview = contents;
    },
    [types.GET_ASK_CONTENT_PREVIEW]( state , contents) {
        state.askContents = contents;
    }
};  

const actions = {
 
    getMainPostProcess: async ({commit}) => {
        const result = await api.getMainPostPreview()
            .then(res=>res)
            .catch(err=>err)

            console.log('메인 포스트 결과 잘 가져왔닝!! result => ', result.data);
            commit('GET_MAIN_CONTENT_PREVIEW',result.data);
    },

    getAskPostProcess: async ({commit})=>{
        const result = await api.getAskPostPreview()
            .then(res=>res)
            .catch(err=>err)

            console.log('질문 게시판 미리보기! 결과 잘 가져왔느냥!',result.data);
            commit('GET_ASK_CONTENT_PREVIEW',result.data);

    },

    uploadContentImgProcess: async ({commit}, payload ) => {
        const { formData } = payload;

        const result = await api.uploadContentImg(formData)
            .then(res=>res)
            .catch(err=>err)
        console.log(result.content_image);
    },
    mainWriteProcess: async ({commit},payload) => {
        const { userId, title, contents, previewImg } = payload;
        const result = await api.mainWrite( userId , title, contents, previewImg )
            .then(res=>res)
            .catch(err=>err);
        console.log('자 mainWrite 결과를 확인해보쟈^^ : ');
        console.log(result);
    },
    writeProcess : async ({commit},payload) => {
        //   userId : this.userId,
        // title : this.titleValue,
        // contents: editorEncode,
        // boardNum: this.boardNum
        const { userId , title , contents , boardNum } = payload;
        const result = await api.askWrite( userId, title, contents, boardNum )
            .then(res => res)
            .catch(err => err);
        
        console.log(result);
        // commit('GET_MAIN_CONTENT_PREVIEW',result.data)
    },

    updateMainProcess : async ({ commit },payload) => {
        const { userId, contentId, title, contents, previewImg } = payload;
        const result = await api.updateMain( userId ,contentId, title, contents, previewImg )
            .then(res=>res)
            .catch(err=>err);
        console.log('main update 결과는?!?!? : ');
        console.log(result);
    },
    updateAskProcess : async ({ commit },payload) => {
        const { userId , contentId, title , contents } = payload;
        const result = await api.updateAsk( userId, contentId, title, contents )
            .then(res => res)
            .catch(err => err);
        console.log('ask update 결과는?!?!? : ');
        console.log(result);
    },

    viewUpProcess : async ({commit},payload) => {
        const {contentId , boardNum } = payload;
        const result = await api.viewUp(contentId,boardNum)
            .then(res=>res)
            .catch(err=>err);
    },

    deletePostProcess : async ({ commit }, payload) => {
        const { contentId , boardNum} = payload;
        const result = await api.deletePost(contentId, boardNum)
            .then(res=>res)
            .catch(err=>err);

    },

    deleteCommentProcess : async ({ commit }, payload) =>{
        const { roomNum, contentId, commentId } = payload;
        const result = await api.deleteComment(roomNum , contentId, commentId)
            .then(res=>res)
            .catch(err=>err);
    },
};




export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};

  