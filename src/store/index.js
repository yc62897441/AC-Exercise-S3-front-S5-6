import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  // 放置資料的地方
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  // 想要修改 state 的資料時，會在 mutations 裡設定函式
  mutations: {
    setCurrentUser(state, currentUser) {
      // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      // 登出時一併將 state 內的 token 移除
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // 設定其他的非同步函式，例如發送 API 請求等等
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, email, image, isAdmin } = data
        commit('setCurrentUser', { id, name, email, image, isAdmin })
        return true
      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
        return false
      }
    }
  },
  modules: {
  }
})
