import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// import Cookies from 'js-cookie';


import user from './modules/user/user';
import post from './modules/post/post';
import update from './modules/update/update';
import like from './modules/like/like';

Vue.use(Vuex);


export const store = new Vuex.Store({
  modules: {
   user,
   post,
   update,
   like
  }, 
  // createPersistedState({
  //   storage: {
  //     // getItem: key => Cookies.get(key),
  //     // setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
  //     // removeItem: key => Cookies.remove(key)
  //   }
  // })

  plugins: [
    createPersistedState({ 
      paths: ["user"] 
    })
  ],
  state: {},
  getters: {},
  mutations: {},
});



// export default new Vuex.Store({
//   modules: {
//    user
//   },
//   state: {},
//   getters: {},
//   mutations: {},
// });
