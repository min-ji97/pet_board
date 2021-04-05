import api from '@/api/ApiService';
import * as types from './mutation_types';

// import * as types from './mutation_types';

const state = {
    mainContents : [],
    mainContentsPreview : [],
    // content_id , context , nickname , preview_image, title ,create_at , like_num , view_num
    askContents : {
        userId : '',
        contentId: '',
        title: '',
        contentText: '',
        contentImg: '',
        view: '',
        like : '',
    },
    askContentsPreview: [],
};

const getters = {
    introContents: (state) => { 
        return state.introContents; 
    },
    askContents : (state) =>{
        return state.askContents;
    }
};

const mutations = {
    setIntroContents( state , contents ) { 
        state.introContents.userId = contents.userId ; 
        state.introContents.contentId = contents.contentId;
    },
    [types.GET_MAIN_CONTENT_PREVIEW]( state , contents) {
        state.mainContentsPreview = contents;
    },
};  

const actions = {
 
    getMainPostProcess: async ({commit}) => {
        const result = await api.getMainPostPreview()
            .then(res=>res)
            .catch(err=>err)
        
            console.log('메인 포스트 결과 잘 가져왔닝!! result => ', result.data);
            commit('GET_MAIN_CONTENT_PREVIEW',result.data)
    },
    uploadContentImgProcess: async ({commit}, payload ) => {
        const { formData } = payload;

        const result = await api.uploadContentImg(formData)
            .then(res=>res)
            .catch(err=>err)
        console.log(result.content_image);
    }
};




export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};

  