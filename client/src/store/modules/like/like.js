import api from '@/api/ApiService';
import * as types from './mutation_types';


const state = {
    likeList : [{
        user_id :1,
        like_check:0,
        content_id:1,
        board_num:1,
    },{
        user_id :1,
        like_check:1,
        content_id:4,
        board_num:2,  
    }],
    // userId , likeCheck , contentId , boardNum

};

const getters = {
   
    
};

const mutations = {
    
};  

const actions = {

    likeCheckProcess: async({commit})=>{
        const result = await api.like()
        .then(res=>res)
        .catch(err=>err)

        console.log('결과!! result => ', result.data);
        // commit('GET_MAIN_CONTENT_PREVIEW',result.data);
    },
 
  
};




export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions,
};

  