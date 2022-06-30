<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input id="email" v-model="email" name="email" type="email" class="form-control" placeholder="email"
          autocomplete="username" required autofocus>
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" v-model="password" name="password" type="password" class="form-control"
          placeholder="Password" autocomplete="current-password" required>
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" v-bind:disabled="isProcessing">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">
            Sign Up
          </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    // 使用 dummydata 測試的寫法
    // handleSubmit(e) {
    //   const data = JSON.stringify({
    //     email: this.email,
    //     password: this.password
    //   })
    //   console.log('handleSubmit', data)
    // },
    async handleSubmit(e) {
      try {
        // 登入表單沒填寫資訊的情況
        if (!this.email || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫 email 和 password'
          })
          return
        }
        this.isProcessing = true

        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })

        const { data } = response

        // 伺服器回傳登入驗證錯誤
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // 登入驗證成功
        // 儲存 token 到瀏覽器內 
        localStorage.setItem('token', data.token)

        // 將資料傳到 Vuex 中
        this.$store.commit('setCurrentUser', data.user)

        // 跳轉回 /restaurants
        this.$router.push('/restaurants')

      } catch (error) {
        this.isProcessing = false
        // 將密碼欄位清空
        this.password = ''
        // 顯示錯誤提示
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })
        console.warn('error', error)
      }
    }
  }
}
</script>